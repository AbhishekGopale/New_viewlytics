const { DB } = require("../../../config/database");
const moment = require("moment");
const { commonResponse } = require("../../../helper");

module.exports = {
    getAttendanceData: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "Unauthorized",
                });
            }

            const today = moment().format('YYYY-MM-DD');
            const user = req.user;
            let roleFilter = '';
            if (user.role_id == 2) roleFilter = `AND s.npm_id = ${Number(user.id)}`;
            else if (user.role_id == 3) roleFilter = `AND s.asm_id = ${Number(user.id)}`;
            else if (user.role_id == 4) roleFilter = `AND s.tl_id = ${Number(user.id)}`;

            const [chains] = await DB.query(`
                SELECT ch.id AS chain_Id, ch.chain_name,
                       COUNT(DISTINCT s.promoter_id) AS total_promotor
                FROM chains ch
                INNER JOIN stores s ON s.chain = ch.id AND s.status = '0' ${roleFilter}
                WHERE ch.status = '0'
                GROUP BY ch.id, ch.chain_name
                ORDER BY total_promotor DESC
                LIMIT 50
            `);

            const [attRows] = await DB.query(`
                SELECT s.chain AS chain_id, COUNT(DISTINCT c.user_id) AS present_promotor
                FROM checkinouts c
                INNER JOIN stores s ON c.store_id = s.id ${roleFilter}
                WHERE c.date = '${today}'
                GROUP BY s.chain
            `);

            const attMap = {};
            attRows.forEach(a => { attMap[a.chain_id] = a.present_promotor; });

            const chainArr = chains.map(c => ({
                chain_Id: c.chain_Id,
                chain_name: c.chain_name,
                total_promotor: c.total_promotor || 0,
                present_promotor: attMap[c.chain_Id] || 0
            }));

            return commonResponse.success(res, 200, "Successfully Get Attendance Report", { attendanceChain: chainArr });
        } catch (error) {
            console.error("getAttendanceData error:", error);
            return commonResponse.success(res, 200, "Successfully Get Attendance Report", { attendanceChain: [] });
        }
    },

    getAttendanceDataChainWise: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "Unauthorized",
                });
            }

            const today = moment().format('YYYY-MM-DD');
            const user = req.user;
            let roleFilter = '';
            if (user.role_id == 2) roleFilter = `AND s.npm_id = ${Number(user.id)}`;
            else if (user.role_id == 3) roleFilter = `AND s.asm_id = ${Number(user.id)}`;
            else if (user.role_id == 4) roleFilter = `AND s.tl_id = ${Number(user.id)}`;

            // 1. Chains with promoters and merchandisers
            const [chains] = await DB.query(`
                SELECT ch.id AS chain_id, ch.chain_name,
                       COUNT(DISTINCT s.id) AS total_stores,
                       COUNT(DISTINCT s.promoter_id) AS total_promoters,
                       COUNT(DISTINCT s.merchandiser_id) AS total_merchandisers
                FROM chains ch
                INNER JOIN stores s ON s.chain = ch.id AND s.status = '0' ${roleFilter}
                WHERE ch.status = '0'
                GROUP BY ch.id, ch.chain_name
                ORDER BY total_stores DESC
                LIMIT 50
            `);

            // 2. Attendance count for today
            const [attRows] = await DB.query(`
                SELECT s.chain AS chain_id,
                       COUNT(DISTINCT c.user_id) AS present_promoters
                FROM checkinouts c
                INNER JOIN stores s ON c.store_id = s.id ${roleFilter}
                WHERE c.date = '${today}'
                GROUP BY s.chain
            `);

            const attMap = {};
            attRows.forEach(a => { attMap[a.chain_id] = a.present_promoters; });

            const chainWise = chains.map(c => {
                const present = attMap[c.chain_id] || 0;
                const total = c.total_promoters || 0;
                const absent = Math.max(0, total - present);
                return {
                    chain_id: c.chain_id,
                    chain_name: c.chain_name,
                    promotor_count: total,
                    presentPro: present,
                    AbsentPro: absent,
                    w_off: 0,
                    leave: 0,
                    not_login: absent
                };
            });

            const result = [
                {
                    ChainWise: chainWise,
                    dashboard: {
                        promoter_id: {
                            total_promoters: chains.reduce((acc, c) => acc + (c.total_promoters || 0), 0),
                            present_promoters: attRows.reduce((acc, a) => acc + (a.present_promoters || 0), 0)
                        },
                        merchandiser_id: {
                            total_merchandisers: chains.reduce((acc, c) => acc + (c.total_merchandisers || 0), 0),
                            present_merchandisers: 0
                        }
                    }
                }
            ];

            return commonResponse.success(res, 200, "Attendance Report", { attendanceChain: result });
        } catch (error) {
            console.error("getAttendanceDataChainWise error:", error);
            return commonResponse.success(res, 200, "Attendance Report", { attendanceChain: [{ ChainWise: [], dashboard: { promoter_id: {}, merchandiser_id: {} } }] });
        }
    }
};