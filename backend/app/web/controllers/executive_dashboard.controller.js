const { DB } = require('../../../config/database');
const moment = require('moment');
const jwt = require('jsonwebtoken');

/**
 * Resolves the authenticated user from req.user, Bearer JWT token, or optional query fallback
 */
async function resolveAuthUser(req) {
    if (req.user && req.user.id) {
        return req.user;
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || "thisistheshubhamprojectdontdoenythinginthisproject";
            const decoded = jwt.verify(token, secret);
            if (decoded && decoded.id) {
                const [users] = await DB.query(
                    'SELECT id, user_id, user_name, first_name, last_name, role_id, role_name, email FROM users WHERE id = :id',
                    { replacements: { id: decoded.id } }
                );
                if (users && users.length > 0) {
                    return users[0];
                }
            }
        } catch (e) {
            console.error('JWT resolution warning in Executive Dashboard:', e.message);
        }
    }

    // Fallback for query param (testing or specific impersonation for admin)
    if (req.query && req.query.user_id) {
        const [users] = await DB.query(
            'SELECT id, user_id, user_name, first_name, last_name, role_id, role_name, email FROM users WHERE id = :id',
            { replacements: { id: req.query.user_id } }
        );
        if (users && users.length > 0) return users[0];
    }

    // Default fallback to IDO NPM (id: 9394) if no auth header present
    const [defaultUsers] = await DB.query(
        'SELECT id, user_id, user_name, first_name, last_name, role_id, role_name, email FROM users WHERE id = 9394'
    );
    return defaultUsers && defaultUsers[0] ? defaultUsers[0] : null;
}

/**
 * Resolves store and promoter hierarchy scoping strictly bounded by the user's role
 */
async function getScopedHierarchy(user, queryParams = {}) {
    const { zone, state, city, chain_id, project_id, tl_id, asm_id, npm_id } = queryParams;
    let storeWhere = ['1=1'];
    let replacements = {};

    // 1. Role-based scoping: user can ONLY access stores assigned to them
    const roleId = Number(user?.role_id);
    const userId = user?.id;

    if (roleId === 2) {
        // NPM
        storeWhere.push('s.npm_id = :authUserId');
        replacements.authUserId = userId;
    } else if (roleId === 3) {
        // ASM
        storeWhere.push('s.asm_id = :authUserId');
        replacements.authUserId = userId;
    } else if (roleId === 4) {
        // TL
        storeWhere.push('s.tl_id = :authUserId');
        replacements.authUserId = userId;
    } else if (roleId === 7) {
        // TA
        storeWhere.push('s.ta_id = :authUserId');
        replacements.authUserId = userId;
    } else if (roleId === 9 || roleId === 10 || roleId === 11) {
        // Client roles
        storeWhere.push('s.client_npc = :authUserId');
        replacements.authUserId = userId;
    } else if (roleId === 1) {
        // Super Admin: can view all or filter by manager
        if (npm_id) {
            storeWhere.push('s.npm_id = :npm_id');
            replacements.npm_id = npm_id;
        }
        if (asm_id) {
            storeWhere.push('s.asm_id = :asm_id');
            replacements.asm_id = asm_id;
        }
        if (tl_id) {
            storeWhere.push('s.tl_id = :tl_id');
            replacements.tl_id = tl_id;
        }
    }

    // 2. Additional filter query parameters (Zone, State, City, Chain, Project)
    if (zone) {
        storeWhere.push('s.zone = :zone');
        replacements.zone = zone;
    }
    if (state) {
        storeWhere.push('s.state = :state');
        replacements.state = state;
    }
    if (city) {
        storeWhere.push('s.city = :city');
        replacements.city = city;
    }
    if (chain_id) {
        storeWhere.push('s.chain = :chain_id');
        replacements.chain_id = chain_id;
    }
    if (project_id) {
        storeWhere.push('s.project_id = :project_id');
        replacements.project_id = project_id;
    }

    const whereStr = storeWhere.join(' AND ');

    // Query distinct promoter IDs assigned to these stores
    const [promoterRows] = await DB.query(
        `SELECT DISTINCT s.promoter_id FROM stores s WHERE ${whereStr} AND s.promoter_id IS NOT NULL AND s.promoter_id != 0`,
        { replacements }
    );
    const promoterIds = promoterRows.map(r => r.promoter_id).filter(Boolean);

    // Query distinct TL IDs assigned to these stores
    const [tlRows] = await DB.query(
        `SELECT DISTINCT s.tl_id FROM stores s WHERE ${whereStr} AND s.tl_id IS NOT NULL AND s.tl_id != 0`,
        { replacements }
    );
    const tlIds = tlRows.map(r => r.tl_id).filter(Boolean);

    // Query store IDs
    const [storeRows] = await DB.query(
        `SELECT DISTINCT s.id FROM stores s WHERE ${whereStr}`,
        { replacements }
    );
    const storeIds = storeRows.map(r => r.id).filter(Boolean);

    return { promoterIds, tlIds, storeIds, whereStr, replacements };
}

module.exports = {
    /**
     * GET /api/v1/web/executive/attendance-summary
     * Returns live scoped attendance KPI metrics (Attendance %, Today Check In, Week Off, Total Users)
     */
    getAttendanceSummary: async (req, res) => {
        try {
            const user = await resolveAuthUser(req);
            const targetDate = req.query.date ? req.query.date : moment().format('YYYY-MM-DD');

            const { promoterIds, tlIds } = await getScopedHierarchy(user, req.query);

            if (!promoterIds || promoterIds.length === 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "No promoters found under user hierarchy",
                    data: {
                        attendance_percentage: "0.00%",
                        today_checkins: 0,
                        week_off_count: 0,
                        total_active_users: 0,
                        not_login_count: 0,
                        target_date: targetDate,
                        user_context: {
                            id: user?.id,
                            name: user?.user_name || (user ? `${user.first_name} ${user.last_name}` : 'N/A'),
                            role_name: user?.role_name,
                            role_id: user?.role_id
                        },
                        promoter_summary: { total: 0, check_in: 0, not_login: 0 },
                        tl_summary: { total: 0, check_in: 0, not_login: 0 }
                    }
                });
            }

            // 1. Total Promoters Assigned
            const totalPromoters = promoterIds.length;

            // 2. Active Promoters count (status = 1)
            const [activeUserRes] = await DB.query(
                `SELECT COUNT(*) as cnt FROM users WHERE id IN (${promoterIds.join(',')}) AND status = 1`
            );
            const activePromoters = activeUserRes && activeUserRes[0] ? activeUserRes[0].cnt : totalPromoters;

            // 3. Today Check-ins (from attendances table, with fallback to checkinouts)
            const [attRes] = await DB.query(
                `SELECT COUNT(DISTINCT user_id) as cnt FROM attendances WHERE user_id IN (${promoterIds.join(',')}) AND date = :targetDate`,
                { replacements: { targetDate } }
            );
            let todayCheckins = attRes && attRes[0] ? attRes[0].cnt : 0;

            if (todayCheckins === 0) {
                const [cioRes] = await DB.query(
                    `SELECT COUNT(DISTINCT user_id) as cnt FROM checkinouts WHERE user_id IN (${promoterIds.join(',')}) AND date = :targetDate`,
                    { replacements: { targetDate } }
                );
                todayCheckins = cioRes && cioRes[0] ? cioRes[0].cnt : 0;
            }

            // 4. Week Off Count for targetDate
            const dayOfWeek = moment(targetDate).day();
            const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];
            const [weekOffRes] = await DB.query(
                `SELECT COUNT(*) as cnt FROM users WHERE id IN (${promoterIds.join(',')}) AND status = 1 AND w_off IN (${wOffDays.map(d => `'${d}'`).join(',')})`
            );
            const weekOffCount = weekOffRes && weekOffRes[0] ? weekOffRes[0].cnt : 0;

            // 5. Attendance % & Not Login
            const workingEligible = Math.max(1, totalPromoters - weekOffCount);
            let attendancePct = Math.round((todayCheckins / workingEligible) * 10000) / 100;
            if (attendancePct > 100) attendancePct = 100;

            const notLoginCount = Math.max(0, totalPromoters - todayCheckins - weekOffCount);

            // 6. TL Attendance Summary
            let tlTotal = tlIds.length;
            let tlCheckin = 0;
            if (tlIds.length > 0) {
                const [tlAttRes] = await DB.query(
                    `SELECT COUNT(DISTINCT user_id) as cnt FROM attendances WHERE user_id IN (${tlIds.join(',')}) AND date = :targetDate`,
                    { replacements: { targetDate } }
                );
                tlCheckin = tlAttRes && tlAttRes[0] ? tlAttRes[0].cnt : 0;
            }
            const tlNotLogin = Math.max(0, tlTotal - tlCheckin);

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched scoped attendance summary",
                data: {
                    attendance_percentage: `${attendancePct}%`,
                    attendance_rate: attendancePct,
                    today_checkins: todayCheckins,
                    week_off_count: weekOffCount,
                    total_active_users: totalPromoters,
                    active_users_count: activePromoters,
                    not_login_count: notLoginCount,
                    working_eligible: workingEligible,
                    target_date: targetDate,
                    user_context: {
                        id: user?.id,
                        name: user?.user_name || (user ? `${user.first_name} ${user.last_name}` : 'N/A'),
                        role_name: user?.role_name,
                        role_id: user?.role_id
                    },
                    promoter_summary: {
                        total: totalPromoters,
                        check_in: todayCheckins,
                        not_login: notLoginCount,
                        week_off: weekOffCount
                    },
                    tl_summary: {
                        total: tlTotal,
                        check_in: tlCheckin,
                        not_login: tlNotLogin
                    }
                }
            });

        } catch (error) {
            console.error('Error in getAttendanceSummary:', error);
            return res.status(500).json({
                statusCode: 500,
                error: true,
                message: "Internal server error fetching attendance summary",
                details: error.message
            });
        }
    },

    /**
     * GET /api/v1/web/executive/attendance-submissions
     * Returns detailed list of submissions with check-in timestamps, store names, user codes, and statuses
     */
    getAttendanceSubmissions: async (req, res) => {
        try {
            const user = await resolveAuthUser(req);
            const targetDate = req.query.date ? req.query.date : moment().format('YYYY-MM-DD');
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 50;
            const offset = (page - 1) * limit;
            const search = req.query.search ? req.query.search.trim() : '';
            const statusFilter = req.query.status ? req.query.status.toLowerCase() : 'all';

            const { promoterIds } = await getScopedHierarchy(user, req.query);

            if (!promoterIds || promoterIds.length === 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "No submissions found",
                    data: {
                        total_records: 0,
                        page,
                        limit,
                        submissions: []
                    }
                });
            }

            // Build search clause
            let searchClause = '';
            let replacements = { targetDate, limit, offset };

            if (search) {
                searchClause = `AND (
                    u.first_name LIKE :search 
                    OR u.last_name LIKE :search 
                    OR u.user_id LIKE :search 
                    OR c.store_name LIKE :search
                )`;
                replacements.search = `%${search}%`;
            }

            // Check if user requested only Present/Checked-in or All
            if (statusFilter === 'check_in' || statusFilter === 'present') {
                const [countRes] = await DB.query(`
                    SELECT COUNT(*) as total
                    FROM checkinouts c
                    JOIN users u ON c.user_id = u.id
                    WHERE c.user_id IN (${promoterIds.join(',')}) AND c.date = :targetDate ${searchClause}
                `, { replacements });
                const total = countRes[0]?.total || 0;

                const [submissions] = await DB.query(`
                    SELECT 
                        c.id, c.user_id, c.store_id, c.store_name, 
                        c.check_in_time, c.check_out_time, c.date, c.check_in_address,
                        u.first_name, u.last_name, u.user_id as user_code, u.role_name, u.mobile_no,
                        s.chain, s.zone, s.state, s.city
                    FROM checkinouts c
                    JOIN users u ON c.user_id = u.id
                    LEFT JOIN stores s ON c.store_id = s.id
                    WHERE c.user_id IN (${promoterIds.join(',')}) AND c.date = :targetDate ${searchClause}
                    ORDER BY c.check_in_time DESC
                    LIMIT :limit OFFSET :offset
                `, { replacements });

                const formatted = submissions.map(s => ({
                    id: s.id,
                    manpower_code: s.user_code || `USR${s.user_id}`,
                    manpower_name: `${s.first_name || ''} ${s.last_name || ''}`.trim(),
                    manpower_type: s.role_name ? s.role_name.charAt(0).toUpperCase() + s.role_name.slice(1) : 'Promoter',
                    attendance_date: s.date,
                    submitted_at: s.check_in_time || 'N/A',
                    check_out_time: s.check_out_time || null,
                    store_name: s.store_name || 'Assigned Store',
                    attendance_option: 'Present',
                    status_badge: 'success',
                    mobile_no: s.mobile_no || 'N/A',
                    city: s.city || 'N/A',
                    zone: s.zone || 'N/A'
                }));

                return res.status(200).json({
                    statusCode: 200,
                    message: "Successfully fetched submissions",
                    data: {
                        total_records: total,
                        page,
                        limit,
                        submissions: formatted
                    }
                });
            }

            // Default: Full team status (Checked in + Not Login + Week Off)
            const dayOfWeek = moment(targetDate).day();
            const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];

            const [checkinMap] = await DB.query(`
                SELECT 
                    c.user_id, c.store_id, c.store_name, 
                    c.check_in_time, c.check_out_time, c.date
                FROM checkinouts c
                WHERE c.user_id IN (${promoterIds.join(',')}) AND c.date = :targetDate
            `, { replacements: { targetDate } });

            const checkinByUser = {};
            checkinMap.forEach(r => {
                checkinByUser[r.user_id] = r;
            });

            const [userList] = await DB.query(`
                SELECT 
                    u.id, u.first_name, u.last_name, u.user_id as user_code, 
                    u.role_name, u.mobile_no, u.w_off, u.city, u.zone
                FROM users u
                WHERE u.id IN (${promoterIds.join(',')})
                ORDER BY u.first_name ASC
            `);

            let combinedList = userList.map(u => {
                const checkin = checkinByUser[u.id];
                const isWOff = wOffDays.includes(String(u.w_off));

                let option = 'Not Login';
                let badge = 'danger';
                let submittedAt = 'N/A';
                let storeName = 'Assigned Store';
                let checkOutTime = null;

                if (checkin) {
                    option = 'Present';
                    badge = 'success';
                    submittedAt = checkin.check_in_time || 'N/A';
                    storeName = checkin.store_name || 'Assigned Store';
                    checkOutTime = checkin.check_out_time || null;
                } else if (isWOff) {
                    option = 'Week Off';
                    badge = 'info';
                }

                return {
                    id: checkin ? checkin.id : `usr_${u.id}`,
                    manpower_code: u.user_code || `USR${u.id}`,
                    manpower_name: `${u.first_name || ''} ${u.last_name || ''}`.trim(),
                    manpower_type: u.role_name ? u.role_name.charAt(0).toUpperCase() + u.role_name.slice(1) : 'Promoter',
                    attendance_date: targetDate,
                    submitted_at: submittedAt,
                    check_out_time: checkOutTime,
                    store_name: storeName,
                    attendance_option: option,
                    status_badge: badge,
                    mobile_no: u.mobile_no || 'N/A',
                    city: u.city || 'N/A',
                    zone: u.zone || 'N/A'
                };
            });

            if (search) {
                const sLower = search.toLowerCase();
                combinedList = combinedList.filter(item =>
                    item.manpower_name.toLowerCase().includes(sLower) ||
                    item.manpower_code.toLowerCase().includes(sLower) ||
                    item.store_name.toLowerCase().includes(sLower)
                );
            }

            if (statusFilter === 'not_login') {
                combinedList = combinedList.filter(item => item.attendance_option === 'Not Login');
            } else if (statusFilter === 'week_off') {
                combinedList = combinedList.filter(item => item.attendance_option === 'Week Off');
            }

            const total = combinedList.length;
            const paginated = combinedList.slice(offset, offset + limit);

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched submissions",
                data: {
                    total_records: total,
                    page,
                    limit,
                    submissions: paginated
                }
            });

        } catch (error) {
            console.error('Error in getAttendanceSubmissions:', error);
            return res.status(500).json({
                statusCode: 500,
                error: true,
                message: "Internal server error fetching attendance submissions",
                details: error.message
            });
        }
    },

    /**
     * GET /api/v1/web/executive/filter-options
     * Returns dropdown filter options strictly populated from the user's assigned stores
     */
    getFilterOptions: async (req, res) => {
        try {
            const user = await resolveAuthUser(req);
            const { whereStr, replacements } = await getScopedHierarchy(user, {});

            const [zones] = await DB.query(
                `SELECT DISTINCT zone FROM stores s WHERE ${whereStr} AND zone IS NOT NULL AND zone != '' ORDER BY zone ASC`,
                { replacements }
            );

            const [states] = await DB.query(
                `SELECT DISTINCT state FROM stores s WHERE ${whereStr} AND state IS NOT NULL AND state != '' ORDER BY state ASC`,
                { replacements }
            );

            const [cities] = await DB.query(
                `SELECT DISTINCT city FROM stores s WHERE ${whereStr} AND city IS NOT NULL AND city != '' ORDER BY city ASC`,
                { replacements }
            );

            const [chains] = await DB.query(
                `SELECT DISTINCT s.chain as chain_id, c.chain_name 
                 FROM stores s 
                 LEFT JOIN chains c ON s.chain = c.id 
                 WHERE ${whereStr} AND s.chain IS NOT NULL AND s.chain != 0 
                 ORDER BY c.chain_name ASC`,
                { replacements }
            );

            const [tls] = await DB.query(
                `SELECT DISTINCT u.id as tl_id, CONCAT(u.first_name, ' ', u.last_name) as tl_name 
                 FROM stores s 
                 JOIN users u ON s.tl_id = u.id 
                 WHERE ${whereStr} AND s.tl_id IS NOT NULL AND s.tl_id != 0 
                 ORDER BY tl_name ASC`,
                { replacements }
            );

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched filter options",
                data: {
                    zones: zones.map(z => ({ label: z.zone, value: z.zone })),
                    states: states.map(s => ({ label: s.state, value: s.state })),
                    cities: cities.map(c => ({ label: c.city, value: c.city })),
                    chains: chains.map(c => ({ label: c.chain_name || `Chain ${c.chain_id}`, value: c.chain_id })),
                    team_leaders: tls.map(t => ({ label: t.tl_name, value: t.tl_id }))
                }
            });

        } catch (error) {
            console.error('Error in getFilterOptions:', error);
            return res.status(500).json({
                statusCode: 500,
                error: true,
                message: "Internal server error fetching filter options",
                details: error.message
            });
        }
    }
};
