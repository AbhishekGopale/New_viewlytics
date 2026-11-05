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
 * Resolves store and manpower hierarchy scoping strictly bounded by the user's role and user ID
 */
async function getScopedHierarchy(user, queryParams = {}) {
    const { zone, state, city, chain_id, project_id, tl_id, asm_id, npm_id, manpower_type } = queryParams;
    let storeWhere = ['s.status = 0'];
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

    // Filter overrides if passed
    if (roleId !== 4 && tl_id) {
        storeWhere.push('s.tl_id = :tl_id');
        replacements.tl_id = tl_id;
    }
    if (roleId !== 3 && roleId !== 4 && asm_id) {
        storeWhere.push('s.asm_id = :asm_id');
        replacements.asm_id = asm_id;
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

    // Query distinct manpower IDs based on manpower_type filter
    let manpowerSql = '';
    if (manpower_type === 'promoter') {
        manpowerSql = `SELECT DISTINCT s.promoter_id AS uid FROM stores s WHERE ${whereStr} AND s.promoter_id IS NOT NULL AND s.promoter_id != 0`;
    } else if (manpower_type === 'merchandiser') {
        manpowerSql = `SELECT DISTINCT s.merchandiser_id AS uid FROM stores s WHERE ${whereStr} AND s.merchandiser_id IS NOT NULL AND s.merchandiser_id != 0`;
    } else {
        manpowerSql = `SELECT DISTINCT s.promoter_id AS uid FROM stores s WHERE ${whereStr} AND s.promoter_id IS NOT NULL AND s.promoter_id != 0
                       UNION
                       SELECT DISTINCT s.merchandiser_id AS uid FROM stores s WHERE ${whereStr} AND s.merchandiser_id IS NOT NULL AND s.merchandiser_id != 0`;
    }

    const [manpowerRows] = await DB.query(manpowerSql, { replacements });
    const rawIds = manpowerRows.map(r => r.uid).filter(Boolean);

    // Filter to active manpower only (status = '0')
    let promoterIds = [];
    if (rawIds.length > 0) {
        const [activeUserRows] = await DB.query(
            `SELECT id FROM users WHERE id IN (${rawIds.join(',')}) AND status = '0'`
        );
        promoterIds = activeUserRows.map(r => r.id);
    }

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
            const startDate = req.query.startDate || req.query.date || moment().format('YYYY-MM-DD');
            const endDate = req.query.endDate || req.query.date || startDate;
            const targetDate = startDate === endDate ? startDate : `${startDate} – ${endDate}`;

            const { promoterIds, tlIds } = await getScopedHierarchy(user, req.query);

            if (!promoterIds || promoterIds.length === 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "No active manpower found under user hierarchy",
                    data: {
                        attendance_percentage: "0.00%",
                        attendance_rate: 0,
                        today_checkins: 0,
                        week_off_count: 0,
                        total_active_users: 0,
                        not_login_count: 0,
                        working_eligible: 0,
                        target_date: targetDate,
                        start_date: startDate,
                        end_date: endDate,
                        user_context: {
                            id: user?.id,
                            name: user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : (user?.user_name || 'N/A'),
                            role_name: user?.role_name,
                            role_id: user?.role_id
                        }
                    }
                });
            }

            const totalActiveUsers = promoterIds.length;

            // 1. Check-ins for date range (from checkinouts)
            const [checkinRes] = await DB.query(
                `SELECT COUNT(DISTINCT user_id) as cnt FROM checkinouts WHERE user_id IN (${promoterIds.join(',')}) AND date BETWEEN :startDate AND :endDate`,
                { replacements: { startDate, endDate } }
            );
            let todayCheckins = checkinRes && checkinRes[0] ? Number(checkinRes[0].cnt) : 0;

            // Fallback to attendances table if checkinouts has 0
            if (todayCheckins === 0) {
                const [attRes] = await DB.query(
                    `SELECT COUNT(DISTINCT user_id) as cnt FROM attendances WHERE user_id IN (${promoterIds.join(',')}) AND date BETWEEN :startDate AND :endDate`,
                    { replacements: { startDate, endDate } }
                );
                todayCheckins = attRes && attRes[0] ? Number(attRes[0].cnt) : 0;
            }

            // 2. Week Off Count for target date(s)
            const dayOfWeek = moment(endDate).day();
            const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];
            const [weekOffRes] = await DB.query(
                `SELECT COUNT(*) as cnt FROM users WHERE id IN (${promoterIds.join(',')}) AND status = '0' AND w_off IN (${wOffDays.map(d => `'${d}'`).join(',')})`
            );
            const weekOffCount = weekOffRes && weekOffRes[0] ? Number(weekOffRes[0].cnt) : 0;

            // 3. Attendance % & Not Login Calculation
            const workingEligible = Math.max(0, totalActiveUsers - weekOffCount);
            let attendancePct = 0;
            if (workingEligible > 0) {
                attendancePct = Math.round((todayCheckins / workingEligible) * 10000) / 100;
            } else if (todayCheckins > 0) {
                attendancePct = 100;
            }
            if (attendancePct > 100) attendancePct = 100;

            const notLoginCount = Math.max(0, workingEligible - todayCheckins);

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched scoped attendance summary",
                data: {
                    attendance_percentage: `${attendancePct.toFixed(2)}%`,
                    attendance_rate: attendancePct,
                    today_checkins: todayCheckins,
                    week_off_count: weekOffCount,
                    total_active_users: totalActiveUsers,
                    not_login_count: notLoginCount,
                    working_eligible: workingEligible,
                    target_date: targetDate,
                    start_date: startDate,
                    end_date: endDate,
                    user_context: {
                        id: user?.id,
                        name: user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : (user?.user_name || 'N/A'),
                        role_name: user?.role_name,
                        role_id: user?.role_id
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
     * GET /api/v1/web/executive/attendance-trend
     * Returns 7-day attendance adherence trend (date, rate, checkins, eligible)
     */
    getAttendanceTrend: async (req, res) => {
        try {
            const user = await resolveAuthUser(req);
            const startDate = req.query.startDate || null;
            const endDate = req.query.endDate || req.query.date || moment().format('YYYY-MM-DD');
            const daysCount = parseInt(req.query.days, 10) || 7;

            const { promoterIds } = await getScopedHierarchy(user, req.query);

            if (!promoterIds || promoterIds.length === 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "No manpower found for trend",
                    data: { trend: [] }
                });
            }

            const totalTeam = promoterIds.length;
            const dates = [];

            if (startDate && startDate !== endDate) {
                let curr = moment(startDate);
                const end = moment(endDate);
                while (curr <= end && dates.length < 31) {
                    dates.push(curr.format('YYYY-MM-DD'));
                    curr.add(1, 'days');
                }
            } else {
                for (let i = daysCount - 1; i >= 0; i--) {
                    dates.push(moment(endDate).subtract(i, 'days').format('YYYY-MM-DD'));
                }
            }

            // Get checkins grouped by date for this team
            const [checkinRows] = await DB.query(`
                SELECT date, COUNT(DISTINCT user_id) as cnt
                FROM checkinouts
                WHERE user_id IN (${promoterIds.join(',')}) AND date BETWEEN :startDate AND :endDate
                GROUP BY date
            `, { replacements: { startDate: dates[0], endDate: dates[dates.length - 1] } });

            const checkinMap = {};
            checkinRows.forEach(r => { checkinMap[r.date] = Number(r.cnt) || 0; });

            // Get users w_off mapping
            const [userWOffs] = await DB.query(`
                SELECT id, w_off FROM users WHERE id IN (${promoterIds.join(',')}) AND status = '0'
            `);

            const trend = dates.map(d => {
                const dayOfWeek = moment(d).day();
                const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];
                const weekOffCount = userWOffs.filter(u => wOffDays.includes(String(u.w_off))).length;
                const workingEligible = Math.max(1, totalTeam - weekOffCount);
                const checkins = checkinMap[d] || 0;
                let rate = Math.round((checkins / workingEligible) * 10000) / 100;
                if (rate > 100) rate = 100;

                return {
                    date: d,
                    label: moment(d).format('DD MMM'),
                    day_name: moment(d).format('ddd'),
                    attendance_rate: rate,
                    checkins: checkins,
                    week_off: weekOffCount,
                    working_eligible: workingEligible,
                    total_team: totalTeam
                };
            });

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched attendance trend",
                data: { trend }
            });

        } catch (error) {
            console.error('Error in getAttendanceTrend:', error);
            return res.status(500).json({
                statusCode: 500,
                error: true,
                message: "Internal server error fetching trend",
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
            const startDate = req.query.startDate || req.query.date || moment().format('YYYY-MM-DD');
            const endDate = req.query.endDate || req.query.date || startDate;
            const targetDate = startDate === endDate ? startDate : `${startDate} to ${endDate}`;
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

            // Get team member records
            const [userList] = await DB.query(`
                SELECT 
                    u.id, u.first_name, u.last_name, u.user_id as user_code, 
                    u.role_name, u.mobile_no, u.w_off, u.city, u.zone
                FROM users u
                WHERE u.id IN (${promoterIds.join(',')}) AND u.status = '0'
                ORDER BY u.first_name ASC
            `);

            // Get checkins in date range
            const [checkinRows] = await DB.query(`
                SELECT 
                    c.id, c.user_id, c.store_id, c.store_name, 
                    c.check_in_time, c.check_out_time, c.date, c.purpose
                FROM checkinouts c
                WHERE c.user_id IN (${promoterIds.join(',')}) AND c.date BETWEEN :startDate AND :endDate
                ORDER BY c.date DESC, c.check_in_time DESC
            `, { replacements: { startDate, endDate } });

            const checkinByUser = {};
            checkinRows.forEach(r => {
                if (!checkinByUser[r.user_id]) {
                    checkinByUser[r.user_id] = r;
                }
            });

            const dayOfWeek = moment(endDate).day();
            const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];

            let combinedList = userList.map(u => {
                const checkin = checkinByUser[u.id];
                const isWOff = wOffDays.includes(String(u.w_off));

                let option = 'Not Login';
                let badge = 'danger';
                let submittedAt = 'N/A';
                let storeName = 'Assigned Store';
                let checkOutTime = null;

                if (checkin) {
                    option = checkin.purpose && checkin.purpose.trim() !== '' ? checkin.purpose : 'Present';
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
                    manpower_code: u.user_code || `ID${u.id}`,
                    manpower_name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || `User ${u.id}`,
                    manpower_type: u.role_name ? u.role_name.charAt(0).toUpperCase() + u.role_name.slice(1) : 'Promoter',
                    attendance_date: checkin ? checkin.date : endDate,
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

            if (statusFilter === 'present' || statusFilter === 'check_in') {
                combinedList = combinedList.filter(item => item.attendance_option !== 'Not Login' && item.attendance_option !== 'Week Off');
            } else if (statusFilter === 'not_login') {
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
                message: "Internal server error fetching submissions",
                details: error.message
            });
        }
    },

    /**
     * GET /api/v1/web/executive/filter-options
     * Returns dynamic filter dropdown options scoped to user
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

            const [asms] = await DB.query(
                `SELECT DISTINCT s.asm_id, s.asm as asm_name 
                 FROM stores s 
                 WHERE ${whereStr} AND s.asm_id IS NOT NULL AND s.asm_id != 0 
                 ORDER BY s.asm ASC`,
                { replacements }
            );

            const [projects] = await DB.query(
                `SELECT DISTINCT p.id as project_id, p.project_name 
                 FROM stores s 
                 JOIN projects p ON s.project_id = p.id 
                 WHERE ${whereStr} AND s.project_id IS NOT NULL AND s.project_id != 0 
                 ORDER BY p.project_name ASC`,
                { replacements }
            );

            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched filter options",
                data: {
                    projects: projects.map(p => ({ label: p.project_name, value: p.project_id })),
                    zones: zones.map(z => ({ label: z.zone, value: z.zone })),
                    states: states.map(s => ({ label: s.state, value: s.state })),
                    cities: cities.map(c => ({ label: c.city, value: c.city })),
                    chains: chains.map(c => ({ label: c.chain_name || `Chain ${c.chain_id}`, value: c.chain_id })),
                    asms: asms.map(a => ({ label: a.asm_name || `ASM ${a.asm_id}`, value: a.asm_id })),
                    team_leaders: tls.map(t => ({ label: t.tl_name, value: t.tl_id })),
                    manpower_types: [
                        { label: 'All Types', value: '' },
                        { label: 'Promoter', value: 'promoter' },
                        { label: 'Merchandiser', value: 'merchandiser' }
                    ]
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
