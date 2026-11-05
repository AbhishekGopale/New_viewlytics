const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../../isEmpty");
const { DEFAULTERR } = require("../../../helper/resources/messages.json");
const { DB } = require("../../../config/database");
const moment = require("moment");

module.exports = {
  getAttendanceData: async (req, res, next) => {
    try {
      const user = req.user;
      const todayDate = moment().format("YYYY-MM-DD");
      const dayOfWeek = moment(todayDate).day();
      const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];

      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 3) {
        storeFilter += " AND s.asm_id = ?";
        replacements.push(user.id);
      }

      const [storeRows] = await DB.query(`
        SELECT s.id as store_id, s.chain as chain_id, c.chain_name,
               COALESCE(z.zone_name, s.zone, 'North') as zone_name,
               s.promoter_id, s.merchandiser_id
        FROM stores s
        LEFT JOIN chains c ON c.id = s.chain
        LEFT JOIN zones z ON z.id = s.zone
        WHERE ${storeFilter}
      `, { replacements });

      const chainMap = new Map();
      const zoneMap = new Map();
      const allUserIds = new Set();

      storeRows.forEach(r => {
        const uId = r.promoter_id || r.merchandiser_id;
        if (uId) allUserIds.add(uId);

        const cId = r.chain_id || '0';
        const cName = r.chain_name || 'Other';
        if (!chainMap.has(cId)) {
          chainMap.set(cId, { id: cId, chain: cName, totalUsers: new Set(), storeCount: 0 });
        }
        chainMap.get(cId).storeCount++;
        if (uId) chainMap.get(cId).totalUsers.add(uId);

        const zName = r.zone_name || 'North';
        if (!zoneMap.has(zName)) {
          zoneMap.set(zName, { zone: zName, totalUsers: new Set(), storeCount: 0 });
        }
        zoneMap.get(zName).storeCount++;
        if (uId) zoneMap.get(zName).totalUsers.add(uId);
      });

      const uList = Array.from(allUserIds);
      const checkins = new Set();
      const leaves = new Set();
      const weekOffs = new Set();

      if (uList.length > 0) {
        const [cRows] = await DB.query(`
          SELECT DISTINCT user_id FROM checkinouts
          WHERE user_id IN (${uList.join(',')}) AND date = '${todayDate}'
        `);
        cRows.forEach(c => checkins.add(c.user_id));

        const [lRows] = await DB.query(`
          SELECT DISTINCT user_id FROM leaves
          WHERE user_id IN (${uList.join(',')}) AND date = '${todayDate}' AND leave_status = '1'
        `);
        lRows.forEach(l => leaves.add(l.user_id));

        const [wRows] = await DB.query(`
          SELECT id FROM users
          WHERE id IN (${uList.join(',')}) AND w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')})
        `);
        wRows.forEach(w => weekOffs.add(w.id));
      }

      const MainArr = [];
      const Attedance = [];

      chainMap.forEach(c => {
        const total = c.totalUsers.size;
        let present = 0;
        let onLeave = 0;
        let weekOff = 0;

        c.totalUsers.forEach(uid => {
          if (checkins.has(uid)) present++;
          else if (leaves.has(uid)) onLeave++;
          else if (weekOffs.has(uid)) weekOff++;
        });

        const notLogin = Math.max(0, total - present - onLeave - weekOff);

        MainArr.push({
          id: c.id,
          chain: c.chain,
          total: total,
          present: present,
          absent: 0,
          week_off: weekOff,
          leave: onLeave,
          not_log_in: notLogin
        });

        Attedance.push({
          id: c.id,
          chain: c.chain,
          total: total,
          present: present
        });
      });

      const ZoneWise = [];
      const zoneWiseChartData = {
        North: [0, 0, 0, 0],
        South: [0, 0, 0, 0],
        East: [0, 0, 0, 0],
        West: [0, 0, 0, 0],
        notLoggedIn: [0, 0, 0, 0]
      };

      let zIdx = 0;
      zoneMap.forEach((z, zName) => {
        zIdx++;
        const total = z.totalUsers.size;
        let present = 0;
        let onLeave = 0;
        let weekOff = 0;

        z.totalUsers.forEach(uid => {
          if (checkins.has(uid)) present++;
          else if (leaves.has(uid)) onLeave++;
          else if (weekOffs.has(uid)) weekOff++;
        });

        const notLogin = Math.max(0, total - present - onLeave - weekOff);

        ZoneWise.push({
          id: zIdx,
          zone: zName,
          total: total,
          present: present,
          absent: 0,
          week_off: weekOff,
          leave: onLeave,
          not_log_in: notLogin
        });

        const chartKey = zName.startsWith('South') ? 'South' : zName;
        if (zoneWiseChartData[chartKey]) {
          zoneWiseChartData[chartKey] = [present, 0, weekOff, onLeave];
        }
      });

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        mainArr: MainArr,
        attedance: Attedance,
        zoneWise: ZoneWise,
        zoneWiseChartData: zoneWiseChartData,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getSOSData: async (req, res, next) => {
    try {
      const user = req.user;
      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [sosRows] = await DB.query(`
        SELECT 
          s.chain as chain_id, 
          COALESCE(c.chain_name, 'Unknown') as chain_name,
          COALESCE(z.zone_name, s.zone, 'North') as zone_name,
          COUNT(DISTINCT s.id) as total_store,
          COUNT(DISTINCT CASE WHEN sr.id IS NOT NULL THEN s.id END) as active_store,
          AVG(CASE WHEN sr.sos_per IS NOT NULL THEN CAST(sr.sos_per AS DECIMAL(5,2)) ELSE 0 END) as avg_sos,
          COUNT(DISTINCT CASE WHEN CAST(sr.sos_per AS DECIMAL(5,2)) >= 50 THEN s.id END) as greater_sos,
          COUNT(DISTINCT CASE WHEN CAST(sr.sos_per AS DECIMAL(5,2)) < 50 AND sr.id IS NOT NULL THEN s.id END) as less_sos
        FROM stores s
        LEFT JOIN chains c ON c.id = s.chain
        LEFT JOIN zones z ON z.id = s.zone
        LEFT JOIN sosreports sr ON sr.store_id = s.id
        WHERE ${storeFilter}
        GROUP BY s.chain, c.chain_name, COALESCE(z.zone_name, s.zone, 'North')
      `, { replacements });

      const SOSChianWise = [];
      const ChainWiseSummery = [];
      const ZoneWiseMap = new Map();

      const chainAgg = new Map();
      sosRows.forEach(row => {
        const cid = row.chain_id || '0';
        if (!chainAgg.has(cid)) {
          chainAgg.set(cid, {
            id: cid,
            chain: row.chain_name,
            total_store: 0,
            active_store: 0,
            greater_sos: 0,
            less_sos: 0,
            sosSum: 0,
            count: 0
          });
        }
        const c = chainAgg.get(cid);
        c.total_store += Number(row.total_store) || 0;
        c.active_store += Number(row.active_store) || 0;
        c.greater_sos += Number(row.greater_sos) || 0;
        c.less_sos += Number(row.less_sos) || 0;
        c.sosSum += (Number(row.avg_sos) || 0);
        c.count++;

        const zName = row.zone_name || 'North';
        if (!ZoneWiseMap.has(zName)) {
          ZoneWiseMap.set(zName, {
            zone: zName,
            total_store: 0,
            active_store: 0,
            greater_sos: 0,
            less_sos: 0
          });
        }
        const z = ZoneWiseMap.get(zName);
        z.total_store += Number(row.total_store) || 0;
        z.active_store += Number(row.active_store) || 0;
        z.greater_sos += Number(row.greater_sos) || 0;
        z.less_sos += Number(row.less_sos) || 0;
      });

      chainAgg.forEach(c => {
        const avg = c.count > 0 ? Math.round(c.sosSum / c.count) : 0;
        SOSChianWise.push({
          id: c.id,
          chain: c.chain,
          total: `${avg}%`
        });
        ChainWiseSummery.push({
          id: c.id,
          chain: c.chain,
          total_store: c.total_store,
          active_store: c.active_store,
          greater_sos: c.greater_sos,
          less_sos: c.less_sos
        });
      });

      const ZoneWise = [];
      let zIdx = 0;
      ZoneWiseMap.forEach((z, zName) => {
        zIdx++;
        ZoneWise.push({
          id: zIdx,
          zone: zName,
          total_store: z.total_store,
          active_store: z.active_store,
          greater_sos: z.greater_sos,
          less_sos: z.less_sos
        });
      });

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        sosChianWise: SOSChianWise,
        chainWiseSummery: ChainWiseSummery,
        zoneWise: ZoneWise,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  salesAnalysis: async (req, res, next) => {
    try {
      const user = req.user;
      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [salesRows] = await DB.query(`
        SELECT 
          s.chain as chain_id,
          COALESCE(c.chain_name, 'Unknown') as chain_name,
          COALESCE(z.zone_name, s.zone, 'North') as zone_name,
          COUNT(DISTINCT s.id) as total_store,
          COUNT(DISTINCT CASE WHEN inv.id IS NOT NULL THEN s.id END) as active_store,
          COALESCE(SUM(inv.total), 0) as total_sales
        FROM stores s
        LEFT JOIN chains c ON c.id = s.chain
        LEFT JOIN zones z ON z.id = s.zone
        LEFT JOIN inventorys inv ON inv.store_id = s.id
        WHERE ${storeFilter}
        GROUP BY s.chain, c.chain_name, COALESCE(z.zone_name, s.zone, 'North')
      `, { replacements });

      const SalesChainArr = [];
      const ChianWiseSummery = [];
      const Zonewise = [];

      const chainAgg = new Map();
      salesRows.forEach(row => {
        const cid = row.chain_id || '0';
        if (!chainAgg.has(cid)) {
          chainAgg.set(cid, {
            chain: row.chain_name,
            totalStore: 0,
            activeStore: 0,
            sales: 0
          });
        }
        const c = chainAgg.get(cid);
        c.totalStore += Number(row.total_store) || 0;
        c.activeStore += Number(row.active_store) || 0;
        c.sales += Number(row.total_sales) || 0;

        Zonewise.push({
          zone: row.zone_name,
          chain: row.chain_name,
          totalStore: Number(row.total_store) || 0,
          activeStore: Number(row.active_store) || 0,
          countofstoreAboveTilldateGre50: 0,
          countofstoreAboveTilldate: 0
        });
      });

      let cIdx = 0;
      chainAgg.forEach((c, cid) => {
        cIdx++;
        SalesChainArr.push({
          chain: c.chain,
          totalStore: c.totalStore,
          activeStore: c.activeStore,
          countofstoreAboveTilldateGre50: 0,
          countofstoreAboveTilldate: 0
        });

        ChianWiseSummery.push({
          id: cIdx,
          chain: c.chain,
          target: 0,
          sale: c.sales,
          achived: 0
        });
      });

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        salesChainArr: SalesChainArr,
        chainWiseSummery: ChianWiseSummery,
        zonewise: Zonewise,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  outofstock: async (req, res, next) => {
    try {
      const user = req.user;
      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [oosRows] = await DB.query(`
        SELECT 
          COALESCE(oos.sku_full_name, 'SKU') as sku_name,
          COUNT(DISTINCT s.id) as totalStore,
          COUNT(DISTINCT CASE WHEN oos.oos_status = '1' THEN s.id END) as oosCount
        FROM stores s
        LEFT JOIN oosreports oos ON oos.store_id = s.id
        WHERE ${storeFilter} AND oos.sku_full_name IS NOT NULL
        GROUP BY oos.sku_full_name
        ORDER BY oosCount DESC
        LIMIT 20
      `, { replacements });

      const SkuWiseCountofStore = oosRows.map(row => ({
        chain: row.sku_name,
        totalStore: Number(row.totalStore) || 0,
        oosCount: Number(row.oosCount) || 0
      }));

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        countCompOOSStore: [],
        skuWiseCountofStore: SkuWiseCountofStore,
        skuWiseCountofStores: SkuWiseCountofStore,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getDashboard: async (req, res, next) => {
    try {
      const user = req.user;
      const todayDate = moment().format("YYYY-MM-DD");

      let targetAchievement = {
        achievement: "0%",
        achieved: "0",
        totalTarget: "0",
        achievement_pieces: "0%",
        achieved_pieces: "0",
        totalTarget_pieces: "0",
      };

      let yearAchievement = {
        target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        achievement: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };

      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [chains] = await DB.query(`
        SELECT DISTINCT s.chain as id, COALESCE(c.chain_name, 'Chain') as chain,
               COUNT(s.id) as count, 0 as sos
        FROM stores s
        LEFT JOIN chains c ON c.id = s.chain
        WHERE ${storeFilter}
        GROUP BY s.chain, c.chain_name
      `, { replacements });

      const [pStats] = await DB.query(`
        SELECT 
          COUNT(DISTINCT s.promoter_id) as total,
          COUNT(DISTINCT c.user_id) as present,
          COUNT(DISTINCT CASE WHEN c.check_out = '1' OR c.check_out_time IS NOT NULL THEN c.user_id END) as check_out
        FROM stores s
        LEFT JOIN checkinouts c ON c.user_id = s.promoter_id AND c.date = '${todayDate}'
        WHERE ${storeFilter} AND s.promoter_id IS NOT NULL
      `, { replacements });

      const total = Number(pStats[0]?.total) || 0;
      const present = Number(pStats[0]?.present) || 0;
      const checkOut = Number(pStats[0]?.check_out) || 0;
      const missed = Math.max(0, total - present);

      let attendance = {
        total: total.toString(),
        present: present.toString().padStart(2, '0'),
        week_off: "0",
        leave: "0",
        absent: checkOut.toString().padStart(2, '0'),
        missed: missed.toString().padStart(2, '0')
      };

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        targetAchievement: targetAchievement,
        attendance: attendance,
        yearAchievement: yearAchievement,
        chain_data: chains,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getMap: async (req, res, next) => {
    try {
      let mapData = [
        {
          user_name: "INDO0432",
          status: "Check in",
          status_id: "1",
          speed: "0KM/hr",
          role: "Promoter",
          last_update: "2023-06-13 4.30pm",
          name: "Pratik Tulkane",
          store_name: "At D-mart,Surat",
          Battery_Status: "56 %",
          location: {
            lat: 21.155714928388655,
            lng: 72.8142860635468,
          },
        },
        {
          user_name: "INDO0902",
          status: "Check out",
          status_id: "0",
          speed: "0KM/hr",
          last_update: "2023-06-13 4.30pm",
          store_name: "At D-mart,Pune",
          name: "Mayank Sahu",
          role: "Promoter",
          Battery_Status: "89 %",
          location: {
            lat: 18.552427495312724,
            lng: 73.91009480723508,
          },
        },
        {
          user_name: "INDO0876",
          status: "Check in",
          status_id: "1",
          speed: "0KM/hr",
          role: "Promoter",
          last_update: "2023-06-13 4.30pm",
          store_name: "At D-mart,Nagpur",
          name: "Jinal Patel",
          Battery_Status: "96 %",
          location: {
            lat: 21.076077414411667,
            lng: 79.07696879296,
          },
        },
        {
          user_name: "INDO0432",
          status: "Check out",
          status_id: "0",
          speed: "0KM/hr",
          role: "Promoter",
          store_name: "At D-mart,Ahmedabad",
          last_update: "2023-06-13 4.30pm",
          name: "Shubham Patel",
          Battery_Status: "36 %",
          location: {
            lat: 22.98480006635752,
            lng: 72.66529005254469,
          },
        },
        {
          user_name: "INDO0432",
          status: "Inactive",
          status_id: "2",
          speed: "0KM/hr",
          role: "Promoter",
          store_name: "At	National Handloom , Nikol",
          last_update: "2023-06-13 4.30pm",
          name: "Snehal Patel",
          Battery_Status: "78 %",
          location: {
            lat: 23.06403422665097,
            lng: 72.67570037179158,
          },
        },
        {
          user_name: "INDO0432",
          status: "Inactive",
          status_id: "2",
          speed: "0KM/hr",
          role: "Promoter",
          store_name: "At	Amazon pantry, Thane",
          last_update: "2023-06-13 4.30pm",
          name: "Samruddhi More",
          Battery_Status: "39 %",
          location: {
            lat: 19.21706773513769,
            lng: 72.9754884619544,
          },
        },
      ];
      return commonResponse.success(res, 200, "Successfully Get All Map Data!", mapData);
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getLiveWebDashboard: async (req, res, next) => {
    try {
      const user = req.user;
      const todayDate = moment().format("YYYY-MM-DD");
      const dayOfWeek = moment(todayDate).day();
      const wOffDays = dayOfWeek === 0 ? ['0', '7'] : [dayOfWeek.toString()];

      if (user && user.role_id == 2) {
        const [stores] = await DB.query(`SELECT DISTINCT promoter_id, merchandiser_id, tl_id FROM stores WHERE npm_id = ? AND status = 0`, { replacements: [user.id] });
        const pIds = stores.map(s => s.promoter_id).filter(Boolean);
        const mIds = stores.map(s => s.merchandiser_id).filter(Boolean);
        const tIds = stores.map(s => s.tl_id).filter(Boolean);

        const pList = pIds.length ? pIds.join(',') : '0';
        const mList = mIds.length ? mIds.join(',') : '0';
        const tList = tIds.length ? tIds.join(',') : '0';

        const [pStats] = await DB.query(`
          SELECT 
            COUNT(DISTINCT u.id) as total,
            COUNT(DISTINCT c.user_id) as check_in,
            COUNT(DISTINCT CASE WHEN c.check_out = '1' OR c.check_out_time IS NOT NULL THEN c.user_id END) as check_out,
            COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
            COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
          FROM users u
          LEFT JOIN checkinouts c ON c.user_id = u.id AND c.date = '${todayDate}'
          LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
          WHERE u.id IN (${pList}) AND u.status = '0'
        `);

        const [mStats] = await DB.query(`
          SELECT 
            COUNT(DISTINCT u.id) as total,
            COUNT(DISTINCT c.user_id) as check_in,
            COUNT(DISTINCT CASE WHEN c.check_out = '1' OR c.check_out_time IS NOT NULL THEN c.user_id END) as check_out,
            COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
            COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
          FROM users u
          LEFT JOIN checkinouts c ON c.user_id = u.id AND c.date = '${todayDate}'
          LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
          WHERE u.id IN (${mList}) AND u.status = '0'
        `);

        const [tStats] = await DB.query(`
          SELECT 
            COUNT(DISTINCT u.id) as total,
            COUNT(DISTINCT a.user_id) as check_in,
            COUNT(DISTINCT CASE WHEN a.time_status = '0' THEN a.user_id END) as check_out,
            COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
            COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
          FROM users u
          LEFT JOIN attendances a ON a.user_id = u.id AND a.date = '${todayDate}'
          LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
          WHERE u.id IN (${tList}) AND u.status = '0'
        `);

        const pTotal = Number(pStats[0]?.total) || 0;
        const pCheckIn = Number(pStats[0]?.check_in) || 0;
        const pCheckOut = Number(pStats[0]?.check_out) || 0;
        const pLeave = Number(pStats[0]?.on_leave) || 0;
        const pWeekOff = Number(pStats[0]?.week_off) || 0;
        const pNotLogin = Math.max(0, pTotal - pCheckIn - pWeekOff - pLeave);

        const mTotal = Number(mStats[0]?.total) || 0;
        const mCheckIn = Number(mStats[0]?.check_in) || 0;
        const mCheckOut = Number(mStats[0]?.check_out) || 0;
        const mLeave = Number(mStats[0]?.on_leave) || 0;
        const mWeekOff = Number(mStats[0]?.week_off) || 0;
        const mNotLogin = Math.max(0, mTotal - mCheckIn - mWeekOff - mLeave);

        const tTotal = Number(tStats[0]?.total) || 0;
        const tCheckIn = Number(tStats[0]?.check_in) || 0;
        const tCheckOut = Number(tStats[0]?.check_out) || 0;
        const tLeave = Number(tStats[0]?.on_leave) || 0;
        const tWeekOff = Number(tStats[0]?.week_off) || 0;
        const tNotLogin = Math.max(0, tTotal - tCheckIn - tWeekOff - tLeave);

        return res.status(200).json({
          error: false,
          statusCode: 200,
          message: "Successfully Get Dashboard Data",
          data: {
            data: {
              PromotorObj: {
                totalPromotor: pTotal,
                CheckInPromotor: pCheckIn,
                CheckOutPromotor: pCheckOut,
                onLeave: pLeave,
                WeekOff: pWeekOff,
                NotLogin: pNotLogin
              },
              MerchandiserObj: {
                totalMer: mTotal,
                CheckInMer: mCheckIn,
                CheckOutMer: mCheckOut,
                onLeave: mLeave,
                WeekOff: mWeekOff,
                NotLogin: mNotLogin
              },
              TlObj: {
                totalTl: tTotal,
                CheckInTl: tCheckIn,
                CheckOutTl: tCheckOut,
                onLeave: tLeave,
                WeekOff: tWeekOff,
                NotLogin: tNotLogin
              }
            }
          }
        });
      }

      // Default for Admin / other roles
      const [pStats] = await DB.query(`
        SELECT 
          COUNT(DISTINCT u.id) as total,
          COUNT(DISTINCT c.user_id) as check_in,
          COUNT(DISTINCT CASE WHEN c.check_out = '1' OR c.check_out_time IS NOT NULL THEN c.user_id END) as check_out,
          COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
          COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
        FROM users u
        LEFT JOIN checkinouts c ON c.user_id = u.id AND c.date = '${todayDate}'
        LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
        WHERE u.role_id = 5 AND u.status = '0'
      `);

      const [tStats] = await DB.query(`
        SELECT 
          COUNT(DISTINCT u.id) as total,
          COUNT(DISTINCT a.user_id) as check_in,
          COUNT(DISTINCT CASE WHEN a.time_status = '0' THEN a.user_id END) as check_out,
          COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
          COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
        FROM users u
        LEFT JOIN attendances a ON a.user_id = u.id AND a.date = '${todayDate}'
        LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
        WHERE u.role_id = 4 AND u.status = '0'
      `);

      const [mStats] = await DB.query(`
        SELECT 
          COUNT(DISTINCT u.id) as total,
          COUNT(DISTINCT c.user_id) as check_in,
          COUNT(DISTINCT CASE WHEN c.check_out = '1' OR c.check_out_time IS NOT NULL THEN c.user_id END) as check_out,
          COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN u.id END) as on_leave,
          COUNT(DISTINCT CASE WHEN u.w_off IN (${wOffDays.map(d=>`'${d}'`).join(',')}) THEN u.id END) as week_off
        FROM users u
        LEFT JOIN checkinouts c ON c.user_id = u.id AND c.date = '${todayDate}'
        LEFT JOIN leaves l ON l.user_id = u.id AND l.date = '${todayDate}' AND l.leave_status = '1'
        WHERE u.role_id = 6 AND u.status = '0'
      `);

      const pTotal = Number(pStats[0]?.total) || 0;
      const pCheckIn = Number(pStats[0]?.check_in) || 0;
      const pCheckOut = Number(pStats[0]?.check_out) || 0;
      const pLeave = Number(pStats[0]?.on_leave) || 0;
      const pWeekOff = Number(pStats[0]?.week_off) || 0;
      const pNotLogin = Math.max(0, pTotal - pCheckIn - pWeekOff - pLeave);

      const mTotal = Number(mStats[0]?.total) || 0;
      const mCheckIn = Number(mStats[0]?.check_in) || 0;
      const mCheckOut = Number(mStats[0]?.check_out) || 0;
      const mLeave = Number(mStats[0]?.on_leave) || 0;
      const mWeekOff = Number(mStats[0]?.week_off) || 0;
      const mNotLogin = Math.max(0, mTotal - mCheckIn - mWeekOff - mLeave);

      const tTotal = Number(tStats[0]?.total) || 0;
      const tCheckIn = Number(tStats[0]?.check_in) || 0;
      const tCheckOut = Number(tStats[0]?.check_out) || 0;
      const tLeave = Number(tStats[0]?.on_leave) || 0;
      const tWeekOff = Number(tStats[0]?.week_off) || 0;
      const tNotLogin = Math.max(0, tTotal - tCheckIn - tWeekOff - tLeave);

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Successfully Get Dashboard Data",
        data: {
          data: {
            PromotorObj: {
              totalPromotor: pTotal,
              CheckInPromotor: pCheckIn,
              CheckOutPromotor: pCheckOut,
              onLeave: pLeave,
              WeekOff: pWeekOff,
              NotLogin: pNotLogin
            },
            MerchandiserObj: {
              totalMer: mTotal,
              CheckInMer: mCheckIn,
              CheckOutMer: mCheckOut,
              onLeave: mLeave,
              WeekOff: mWeekOff,
              NotLogin: mNotLogin
            },
            TlObj: {
              totalTl: tTotal,
              CheckInTl: tCheckIn,
              CheckOutTl: tCheckOut,
              onLeave: tLeave,
              WeekOff: tWeekOff,
              NotLogin: tNotLogin
            }
          }
        }
      });
    } catch (err) {
      console.error(err);
      next(err);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getUserList: async (req, res, next) => {
    try {
      const [rows] = await DB.query(`
        SELECT DISTINCT
          CONCAT(COALESCE(npm.first_name, ''), ' ', COALESCE(npm.last_name, '')) AS npm,
          CONCAT(COALESCE(ta.first_name, ''), ' ', COALESCE(ta.last_name, '')) AS ta,
          CONCAT(COALESCE(asm.first_name, ''), ' ', COALESCE(asm.last_name, '')) AS asm,
          CONCAT(COALESCE(tl.first_name, ''), ' ', COALESCE(tl.last_name, '')) AS tl,
          '1' AS store_ids
        FROM user_relations ur
        LEFT JOIN users npm ON ur.user_npm = npm.id
        LEFT JOIN users ta ON ur.user_ta = ta.id
        LEFT JOIN users asm ON ur.user_asm = asm.id
        LEFT JOIN users tl ON ur.user_tl = tl.id
        WHERE ur.delete_status = '0' AND ur.user_npm IS NOT NULL AND ur.user_tl IS NOT NULL
        GROUP BY ur.user_npm, ur.user_ta, ur.user_asm, ur.user_tl
        LIMIT 20
      `);

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Successfully Get User List",
        data: rows.length > 0 ? rows : [
          { npm: 'IDO NPM', ta: 'IDO TA', asm: 'IDO ASM', tl: 'IDO TL', store_ids: '1' }
        ]
      });
    } catch (err) {
      console.error(err);
      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: [{ npm: 'IDO NPM', ta: 'IDO TA', asm: 'IDO ASM', tl: 'IDO TL', store_ids: '1' }]
      });
    }
  },

  getActivityLogs: async (req, res, next) => {
    try {
      const [logs] = await DB.query(`
        SELECT al.id, al.project_id, al.user_id, al.action_type, al.user_type, al.action, al.activity_data, al.timestamp,
               u.first_name, u.last_name, u.user_name,
               p.project_name
        FROM activity_logs al
        LEFT JOIN users u ON al.user_id = u.id
        LEFT JOIN projects p ON al.project_id = p.id
        ORDER BY al.id DESC
        LIMIT 50
      `);

      const formatted = logs.map(l => ({
        id: l.id,
        action: l.action,
        activity_data: l.activity_data,
        action_type: l.action_type,
        user_type: l.user_type,
        timestamp: l.timestamp,
        User: {
          first_name: l.first_name || '',
          last_name: l.last_name || '',
          user_name: l.user_name || ''
        },
        project: {
          project_name: l.project_name || 'Viewlytics'
        }
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Successfully Get Activity Logs",
        data: formatted
      });
    } catch (err) {
      console.error(err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getReportCounters: async (req, res, next) => {
    try {
      const [counters] = await DB.query(`
        SELECT rc.id, rc.user_id, rc.project_id, rc.report_name, rc.download_count, rc.date,
               u.first_name, u.last_name, u.user_name
        FROM report_counters rc
        LEFT JOIN users u ON rc.user_id = u.id
        ORDER BY rc.id DESC
        LIMIT 50
      `);

      const formatted = counters.map(c => ({
        id: c.id,
        report_name: c.report_name,
        download_count: c.download_count,
        date: c.date,
        user: {
          first_name: c.first_name || '',
          last_name: c.last_name || '',
          user_name: c.user_name || ''
        }
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Successfully Get Report Counters",
        data: formatted
      });
    } catch (err) {
      console.error(err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getDashboardTarget: async (req, res, next) => {
    try {
      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: {
          Archived: {},
          ArchivedPeace: {},
          TargetMonthWise: { totalSum: 0 }
        }
      });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: {} });
    }
  },

  getDashboardSos: async (req, res, next) => {
    try {
      const user = req.user;
      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [sosRows] = await DB.query(`
        SELECT 
          s.chain as chain_id, 
          COALESCE(c.chain_name, 'Unknown') as chain_name,
          AVG(CASE WHEN sr.sos_per IS NOT NULL THEN CAST(sr.sos_per AS DECIMAL(5,2)) ELSE 0 END) as avg_sos
        FROM stores s
        LEFT JOIN chains c ON c.id = s.chain
        LEFT JOIN sosreports sr ON sr.store_id = s.id
        WHERE ${storeFilter}
        GROUP BY s.chain, c.chain_name
      `, { replacements });

      const formatted = sosRows.map(r => ({
        id: r.chain_id,
        chain: r.chain_name,
        sos: `${Math.round(Number(r.avg_sos) || 0)}%`
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: formatted
      });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getDashboardOssV2: async (req, res, next) => {
    try {
      const user = req.user;
      let storeFilter = "s.status = '0'";
      let replacements = [];
      if (user && user.role_id == 2) {
        storeFilter += " AND s.npm_id = ?";
        replacements.push(user.id);
      } else if (user && user.role_id == 4) {
        storeFilter += " AND s.tl_id = ?";
        replacements.push(user.id);
      }

      const [oosRows] = await DB.query(`
        SELECT 
          COALESCE(oos.sku_full_name, 'SKU') as sku_name,
          COUNT(DISTINCT s.id) as total_store,
          COUNT(DISTINCT CASE WHEN oos.oos_status = '1' THEN s.id END) as oos_count
        FROM stores s
        LEFT JOIN oosreports oos ON oos.store_id = s.id
        WHERE ${storeFilter} AND oos.sku_full_name IS NOT NULL
        GROUP BY oos.sku_full_name
        ORDER BY oos_count DESC
        LIMIT 20
      `, { replacements });

      const formatted = oosRows.map(r => ({
        sku: r.sku_name,
        total: Number(r.total_store) || 0,
        count: Number(r.oos_count) || 0
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: formatted
      });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getCheckInOutData: async (req, res, next) => {
    try {
      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: [
          {
            activeUsers: [
              {
                checkInOut: [],
                map: [],
                leave: [],
                user: []
              }
            ],
            inactiveUsers: []
          }
        ]
      });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getReportProlist: async (req, res, next) => {
    try {
      const user = req.user;
      let hierarchyScope = '';
      if (user && user.role_id == 2) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.npm_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 4) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.tl_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 3) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.asm_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 7) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.ta_id = ${Number(user.id)} AND s.status = '0' AND`;
      else hierarchyScope = 'WHERE';

      const [pro] = await DB.query(`
        SELECT DISTINCT u.id AS value, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS label
        FROM users u
        ${hierarchyScope} u.role_id = 5 AND u.status = '0'
        ORDER BY label ASC
      `);
      return res.status(200).json({ error: false, statusCode: 200, data: pro });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getReportMerlist: async (req, res, next) => {
    try {
      const user = req.user;
      let hierarchyScope = '';
      if (user && user.role_id == 2) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.npm_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 4) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.tl_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 3) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.asm_id = ${Number(user.id)} AND s.status = '0' AND`;
      else if (user && user.role_id == 7) hierarchyScope = `INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) WHERE s.ta_id = ${Number(user.id)} AND s.status = '0' AND`;
      else hierarchyScope = 'WHERE';

      const [mer] = await DB.query(`
        SELECT DISTINCT u.id AS value, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS label
        FROM users u
        ${hierarchyScope} u.role_id = 6 AND u.status = '0'
        ORDER BY label ASC
      `);
      return res.status(200).json({ error: false, statusCode: 200, data: mer });
    } catch (err) {
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getReportOpeningInventory: async (req, res, next) => {
    try {
      const { startDate, endDate, pm_id } = req.body;
      const user = req.user;
      let userFilter = '';
      if (Array.isArray(pm_id) && pm_id.length > 0) {
        userFilter = `AND i.user_id IN (${pm_id.map(Number).join(',')})`;
      }
      let dateFilter = '';
      if (startDate && endDate) {
        dateFilter = `AND i.date BETWEEN '${startDate}' AND '${endDate}'`;
      }

      let storeFilter = '';
      if (user && user.role_id == 2) storeFilter = `AND s.npm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 4) storeFilter = `AND s.tl_id = ${Number(user.id)}`;
      else if (user && user.role_id == 3) storeFilter = `AND s.asm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 7) storeFilter = `AND s.ta_id = ${Number(user.id)}`;

      const [rows] = await DB.query(`
        SELECT i.id, i.date, i.remark, i.opning_inventory, i.sku_full_name,
               u.id AS user_id, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS full_name, u.email,
               r.role_name,
               s.store_name, s.store_code, s.store_code_ids, s.city, s.state, s.zone, s.country_name,
               s.promoter, s.merchandiser, s.client_se, s.client_asm, s.client_npc,
               s.tl AS ido_tl, s.asm AS ido_asm, s.ta AS ido_ta, s.npm AS ido_npm,
               c.chain_name,
               p.project_name
        FROM inventorys i
        INNER JOIN users u ON i.user_id = u.id AND u.status = '0'
        LEFT JOIN roles r ON u.role_id = r.role_id
        LEFT JOIN stores s ON i.store_id = s.id AND s.status = '0'
        LEFT JOIN chains c ON s.chain = c.id
        LEFT JOIN projects p ON s.project_id = p.id
        WHERE 1=1 ${userFilter} ${dateFilter} ${storeFilter}
        ORDER BY i.date DESC
        LIMIT 2000
      `);

      const grouped = {};
      const skuSet = new Set();
      rows.forEach(r => {
        const key = `${r.user_id}_${r.store_name}_${r.date}`;
        if (!grouped[key]) {
          grouped[key] = {
            project_name: r.project_name || 'IDONNEOUS',
            userId: r.user_id,
            full_name: r.full_name,
            role_name: r.role_name,
            email: r.email,
            promoter: r.promoter || r.full_name,
            merchandiser: r.merchandiser || '-',
            chain: r.chain_name || '-',
            store_code: r.store_code || '-',
            store_code_ids: r.store_code_ids || r.store_code || '-',
            store_name: r.store_name || '-',
            zone: r.zone || '-',
            country_name: r.country_name || 'India',
            state: r.state || '-',
            city: r.city || '-',
            client_se: r.client_se || '-',
            client_asm: r.client_asm || '-',
            client_npc: r.client_npc || '-',
            ido_tl: r.ido_tl || 'IDO TL',
            ido_asm: r.ido_asm || 'IDO ASM',
            ido_ta: r.ido_ta || 'IDO TA',
            ido_npm: r.ido_npm || 'IDO NPM',
            date: r.date,
            remark: r.remark || '',
            total_Opening: 0,
            SKUArray: []
          };
        }
        grouped[key].total_Opening += Number(r.opning_inventory) || 0;
        if (r.sku_full_name) {
          skuSet.add(r.sku_full_name);
          grouped[key].SKUArray.push({ [r.sku_full_name]: r.opning_inventory });
        }
      });

      const skuList = Array.from(skuSet);
      const headerObj = skuList.length > 0 ? [{ 'SKU Category': skuList }] : [{ 'SKU Category': ['Standard SKU'] }];
      const dsrList = Object.values(grouped);

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Opening Inventory Report Generated Successfully",
        data: [
          { Header: headerObj },
          { DSR: dsrList }
        ]
      });
    } catch (err) {
      console.error(err);
      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: [
          { Header: [{ 'SKU Category': ['SKU 1'] }] },
          { DSR: [] }
        ]
      });
    }
  },

  getReportAttendanceDump: async (req, res, next) => {
    try {
      const { startDate, endDate, userId, roleName, pm_id } = req.body;
      const user = req.user;
      let userFilter = '';
      if (userId) {
        userFilter = `AND c.user_id = ${Number(userId)}`;
      } else if (Array.isArray(pm_id) && pm_id.length > 0) {
        userFilter = `AND c.user_id IN (${pm_id.map(Number).join(',')})`;
      }
      let dateFilter = '';
      if (startDate && endDate) {
        dateFilter = `AND c.date BETWEEN '${startDate}' AND '${endDate}'`;
      } else if (startDate) {
        dateFilter = `AND c.date >= '${startDate}'`;
      }

      let storeFilter = '';
      if (user && user.role_id == 2) storeFilter = `AND st.npm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 4) storeFilter = `AND st.tl_id = ${Number(user.id)}`;
      else if (user && user.role_id == 3) storeFilter = `AND st.asm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 7) storeFilter = `AND st.ta_id = ${Number(user.id)}`;

      const [rows] = await DB.query(`
        SELECT c.id, c.date, c.check_in_time, c.check_out_time, c.total_time, c.task_status, c.store_status,
               c.check_in_address, c.check_out_address,
               u.id AS user_id, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS full_name, u.email,
               r.role_name,
               st.store_name, st.store_code, st.store_code_ids, st.city, st.state, st.zone, st.country_name,
               st.promoter, st.merchandiser, st.client_se, st.client_asm, st.client_npc,
               st.tl AS ido_tl, st.asm AS ido_asm, st.ta AS ido_ta, st.npm AS ido_npm,
               ch.chain_name,
               p.project_name
        FROM checkinouts c
        INNER JOIN users u ON c.user_id = u.id AND u.status = '0'
        LEFT JOIN roles r ON u.role_id = r.role_id
        LEFT JOIN stores st ON c.store_id = st.id AND st.status = '0'
        LEFT JOIN chains ch ON st.chain = ch.id
        LEFT JOIN projects p ON st.project_id = p.id
        WHERE 1=1 ${userFilter} ${dateFilter} ${storeFilter}
        ORDER BY c.date DESC, c.id DESC
        LIMIT 5000
      `);

      const dumpData = rows.map((r) => ({
        'Project Name': r.project_name || 'IDONNEOUS',
        'User Id': r.user_id || '-',
        'Full Name': (r.full_name || '').trim() || '-',
        'Role': r.role_name || 'Promoter',
        'Email': r.email || '-',
        'Promoter': r.promoter || r.full_name || '-',
        'Merchandiser': r.merchandiser || '-',
        'Chain': r.chain_name || '-',
        'System Store Code': r.store_code || '-',
        'Idonneous Store Code': r.store_code_ids || '-',
        'Store Name': r.store_name || '-',
        'Zone': r.zone || '-',
        'Country': r.country_name || 'India',
        'State': r.state || '-',
        'City': r.city || '-',
        'Client SE': r.client_se || '-',
        'Client ASM': r.client_asm || '-',
        'Client NPC': r.client_npc || '-',
        'IDO TL': r.ido_tl || 'IDO TL',
        'IDO ASM': r.ido_asm || 'IDO ASM',
        'IDO TA': r.ido_ta || 'IDO TA',
        'IDO NPM': r.ido_npm || 'IDO NPM',
        'Date': r.date || '-',
        'Check In Time': r.check_in_time || '-',
        'Check Out Time': r.check_out_time || '-',
        'Total Time': r.total_time || '0',
        'Check In Address': r.check_in_address || '-',
        'Check Out Address': r.check_out_address || '-',
        'Status': r.check_out_time ? 'Checked Out' : (r.check_in_time ? 'Checked In' : 'Present')
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Attendance Dump Data Fetched Successfully",
        data: dumpData
      });
    } catch (err) {
      console.error('getReportAttendanceDump error:', err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getReportSosDump: async (req, res, next) => {
    try {
      const { startDate, endDate, userId, pm_id } = req.body;
      const user = req.user;
      let userFilter = '';
      if (userId) {
        userFilter = `AND s.user_id = ${Number(userId)}`;
      } else if (Array.isArray(pm_id) && pm_id.length > 0) {
        userFilter = `AND s.user_id IN (${pm_id.map(Number).join(',')})`;
      }
      let dateFilter = '';
      if (startDate && endDate) {
        dateFilter = `AND s.date BETWEEN '${startDate}' AND '${endDate}'`;
      } else if (startDate) {
        dateFilter = `AND s.date >= '${startDate}'`;
      }

      let storeFilter = '';
      if (user && user.role_id == 2) storeFilter = `AND st.npm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 4) storeFilter = `AND st.tl_id = ${Number(user.id)}`;
      else if (user && user.role_id == 3) storeFilter = `AND st.asm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 7) storeFilter = `AND st.ta_id = ${Number(user.id)}`;

      const [rows] = await DB.query(`
        SELECT s.id, s.date, s.brand_facing, s.compation_facing, s.sos_per,
               u.id AS user_id, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS full_name, u.email,
               r.role_name,
               st.store_name, st.store_code, st.store_code_ids, st.city, st.state, st.zone, st.country_name,
               st.promoter, st.merchandiser, st.client_se, st.client_asm, st.client_npc,
               st.tl AS ido_tl, st.asm AS ido_asm, st.ta AS ido_ta, st.npm AS ido_npm,
               c.chain_name,
               cat.category_name,
               p.project_name
        FROM sosreports s
        INNER JOIN users u ON s.user_id = u.id AND u.status = '0'
        LEFT JOIN roles r ON u.role_id = r.role_id
        LEFT JOIN stores st ON s.store_id = st.id AND st.status = '0'
        LEFT JOIN chains c ON st.chain = c.id
        LEFT JOIN sku_categories cat ON s.category_id = cat.id
        LEFT JOIN projects p ON st.project_id = p.id
        WHERE 1=1 ${userFilter} ${dateFilter} ${storeFilter}
        ORDER BY s.date DESC, s.id DESC
        LIMIT 5000
      `);

      const dumpData = rows.map((r) => ({
        'Project Name': r.project_name || 'IDONNEOUS',
        'User Id': r.user_id || '-',
        'Full Name': (r.full_name || '').trim() || '-',
        'Role': r.role_name || 'Promoter',
        'Email': r.email || '-',
        'Promoter': r.promoter || r.full_name || '-',
        'Merchandiser': r.merchandiser || '-',
        'Chain': r.chain_name || '-',
        'System Store Code': r.store_code || '-',
        'Idonneous Store Code': r.store_code_ids || '-',
        'Store Name': r.store_name || '-',
        'Zone': r.zone || '-',
        'Country': r.country_name || 'India',
        'State': r.state || '-',
        'City': r.city || '-',
        'Client SE': r.client_se || '-',
        'Client ASM': r.client_asm || '-',
        'Client NPC': r.client_npc || '-',
        'IDO TL': r.ido_tl || 'IDO TL',
        'IDO ASM': r.ido_asm || 'IDO ASM',
        'IDO TA': r.ido_ta || 'IDO TA',
        'IDO NPM': r.ido_npm || 'IDO NPM',
        'Date': r.date || '-',
        'Category': r.category_name || '-',
        'Brand Facing': Number(r.brand_facing) || 0,
        'Competition Facing': Number(r.compation_facing) || 0,
        'SOS %': `${Number(r.sos_per) || 0}%`
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Share of Shelf Dump Data Fetched Successfully",
        data: dumpData
      });
    } catch (err) {
      console.error('getReportSosDump error:', err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  getAttendanceEvents: async (req, res, next) => {
    try {
      const { userId, month, year, startDate, endDate } = req.body;
      if (!userId) {
        return res.status(200).json({ error: false, statusCode: 200, data: [] });
      }

      let dateCondition = '';
      if (startDate && endDate) {
        dateCondition = `AND c.date BETWEEN '${startDate}' AND '${endDate}'`;
      } else if (month && year) {
        const startStr = `${year}-${String(month).padStart(2, '0')}-01`;
        dateCondition = `AND c.date >= '${startStr}' AND c.date <= LAST_DAY('${startStr}')`;
      }

      const [checkins] = await DB.query(`
        SELECT DISTINCT date, check_in_time, check_out_time
        FROM checkinouts c
        WHERE c.user_id = ${Number(userId)} ${dateCondition}
        ORDER BY date ASC
      `);

      const leaveCondition = dateCondition.replace(/c\.date/g, 'date');
      const [leaves] = await DB.query(`
        SELECT date, leave_type, reason
        FROM leaves
        WHERE user_id = ${Number(userId)} ${leaveCondition}
      `);

      const events = [];
      const presentDates = new Set();
      checkins.forEach((c) => {
        presentDates.add(c.date);
        events.push({
          title: `Present (${c.check_in_time || 'In'} - ${c.check_out_time || 'Ongoing'})`,
          start: c.date,
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50'
        });
      });

      leaves.forEach((l) => {
        if (!presentDates.has(l.date)) {
          events.push({
            title: `Leave (${l.leave_type || 'Leave'})`,
            start: l.date,
            backgroundColor: '#FF9800',
            borderColor: '#FF9800'
          });
        }
      });

      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: events
      });
    } catch (err) {
      console.error('getAttendanceEvents error:', err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },

  exportGenericReport: async (req, res, next) => {
    try {
      const { startDate, endDate, pm_id } = req.body;
      const user = req.user;
      const path = (req.originalUrl || req.url || '').toLowerCase();

      let storeFilter = '';
      if (user && user.role_id == 2) storeFilter = `AND s.npm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 4) storeFilter = `AND s.tl_id = ${Number(user.id)}`;
      else if (user && user.role_id == 3) storeFilter = `AND s.asm_id = ${Number(user.id)}`;
      else if (user && user.role_id == 7) storeFilter = `AND s.ta_id = ${Number(user.id)}`;

      let userFilter = '';
      if (Array.isArray(pm_id) && pm_id.length > 0) {
        userFilter = `AND t.user_id IN (${pm_id.map(Number).join(',')})`;
      }
      let dateFilter = '';
      if (startDate && endDate) {
        dateFilter = `AND t.date BETWEEN '${startDate}' AND '${endDate}'`;
      } else if (startDate) {
        dateFilter = `AND t.date >= '${startDate}'`;
      }

      const commonCols = `
        u.id AS user_id, CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS full_name, u.email,
        r.role_name,
        s.store_name, s.store_code, s.store_code_ids, s.city, s.state, s.zone, s.country_name,
        s.promoter, s.merchandiser, s.client_se, s.client_asm, s.client_npc,
        s.tl AS ido_tl, s.asm AS ido_asm, s.ta AS ido_ta, s.npm AS ido_npm,
        ch.chain_name, p.project_name
      `;

      let sql = '';
      if (path.includes('dsr') || path.includes('closing') || path.includes('new_inventory')) {
        sql = `
          SELECT i.id, i.date, i.sku_full_name, i.opning_inventory, i.total_sale, i.closing_inventory, i.remark,
                 ${commonCols}
          FROM inventorys i
          INNER JOIN users u ON i.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON i.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'i.')} ${dateFilter.replace(/t\./g, 'i.')}
          ORDER BY i.date DESC, i.id DESC LIMIT 3000
        `;
      } else if (path.includes('checkin') || path.includes('user-checkinfo')) {
        sql = `
          SELECT c.id, c.date, c.check_in_time, c.check_out_time, c.total_time, c.check_in_address, c.check_out_address,
                 ${commonCols}
          FROM checkinouts c
          INNER JOIN users u ON c.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON c.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'c.')} ${dateFilter.replace(/t\./g, 'c.')}
          ORDER BY c.date DESC, c.id DESC LIMIT 3000
        `;
      } else if (path.includes('asset')) {
        sql = `
          SELECT a.id, DATE(a.created_at) AS date, a.asset_type, a.implemented,
                 ${commonCols}
          FROM assettrakings a
          INNER JOIN users u ON a.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON a.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'a.')} ${dateFilter.replace(/t\.date/g, 'DATE(a.created_at)')}
          ORDER BY a.id DESC LIMIT 3000
        `;
      } else if (path.includes('shopper')) {
        sql = `
          SELECT se.id, DATE(se.created_at) AS date, se.store_name,
                 ${commonCols}
          FROM shopperengagements se
          INNER JOIN users u ON se.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON se.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'se.')} ${dateFilter.replace(/t\.date/g, 'DATE(se.created_at)')}
          ORDER BY se.id DESC LIMIT 3000
        `;
      } else if (path.includes('promo')) {
        sql = `
          SELECT pr.id, pr.promo_type, pr.start_date, pr.end_date, pr.project_name,
                 s.store_name, s.store_code, s.store_code_ids, s.city, s.state, s.zone, s.country_name,
                 s.promoter, s.merchandiser, s.client_se, s.client_asm, s.client_npc,
                 s.tl AS ido_tl, s.asm AS ido_asm, s.ta AS ido_ta, s.npm AS ido_npm,
                 ch.chain_name
          FROM promos pr
          LEFT JOIN stores s ON pr.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON pr.chain_id = ch.id
          ORDER BY pr.id DESC LIMIT 3000
        `;
      } else if (path.includes('competition') || path.includes('market_intelligence')) {
        sql = `
          SELECT cb.id, DATE(cb.created_at) AS date, cb.brand_remark, cb.brand_available,
                 ${commonCols}
          FROM competition_brands cb
          INNER JOIN users u ON cb.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON cb.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'cb.')} ${dateFilter.replace(/t\.date/g, 'DATE(cb.created_at)')}
          ORDER BY cb.id DESC LIMIT 3000
        `;
      } else if (path.includes('home_leave') || path.includes('leave')) {
        sql = `
          SELECT hl.id, hl.date, hl.check_in_time, hl.address,
                 ${commonCols}
          FROM home_leaves hl
          INNER JOIN users u ON hl.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON (s.promoter_id = u.id OR s.merchandiser_id = u.id) AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'hl.')} ${dateFilter.replace(/t\./g, 'hl.')}
          ORDER BY hl.date DESC, hl.id DESC LIMIT 3000
        `;
      } else if (path.includes('order_request')) {
        sql = `
          SELECT o.id, o.date, o.sku_full_name, o.remark, o.fillup_status,
                 ${commonCols}
          FROM order_request_forms o
          INNER JOIN users u ON o.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON o.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'o.')} ${dateFilter.replace(/t\./g, 'o.')}
          ORDER BY o.date DESC, o.id DESC LIMIT 3000
        `;
      } else {
        sql = `
          SELECT fv.id, fv.date, fv.uniform_status, fv.uniform_reason,
                 ${commonCols}
          FROM fieldvisits fv
          INNER JOIN users u ON fv.user_id = u.id AND u.status = '0'
          LEFT JOIN roles r ON u.role_id = r.role_id
          INNER JOIN stores s ON fv.store_id = s.id AND s.status = '0' ${storeFilter}
          LEFT JOIN chains ch ON s.chain = ch.id
          LEFT JOIN projects p ON s.project_id = p.id
          WHERE 1=1 ${userFilter.replace(/t\./g, 'fv.')} ${dateFilter.replace(/t\./g, 'fv.')}
          ORDER BY fv.date DESC, fv.id DESC LIMIT 3000
        `;
      }

      const [rows] = await DB.query(sql);
      const formatted = rows.map((r) => ({
        'Project Name': r.project_name || 'IDONNEOUS',
        'User Id': r.user_id || '-',
        'Full Name': (r.full_name || '').trim() || '-',
        'Role': r.role_name || '-',
        'Email': r.email || '-',
        'Promoter': r.promoter || r.full_name || '-',
        'Merchandiser': r.merchandiser || '-',
        'Chain': r.chain_name || '-',
        'System Store Code': r.store_code || '-',
        'Idonneous Store Code': r.store_code_ids || '-',
        'Store Name': r.store_name || '-',
        'Zone': r.zone || '-',
        'Country': r.country_name || 'India',
        'State': r.state || '-',
        'City': r.city || '-',
        'Client SE': r.client_se || '-',
        'Client ASM': r.client_asm || '-',
        'Client NPC': r.client_npc || '-',
        'IDO TL': r.ido_tl || 'IDO TL',
        'IDO ASM': r.ido_asm || 'IDO ASM',
        'IDO TA': r.ido_ta || 'IDO TA',
        'IDO NPM': r.ido_npm || 'IDO NPM',
        'Date': r.date || '-',
        ...(r.check_in_time ? { 'Check In Time': r.check_in_time } : {}),
        ...(r.check_out_time ? { 'Check Out Time': r.check_out_time } : {}),
        ...(r.total_time ? { 'Total Time': r.total_time } : {}),
        ...(r.check_in_address ? { 'Check In Address': r.check_in_address } : {}),
        ...(r.check_out_address ? { 'Check Out Address': r.check_out_address } : {}),
        ...(r.sku_full_name ? { 'SKU': r.sku_full_name } : {}),
        ...(r.opning_inventory !== undefined ? { 'Opening Inventory': Number(r.opning_inventory) || 0 } : {}),
        ...(r.total_sale !== undefined ? { 'Total Sale': Number(r.total_sale) || 0 } : {}),
        ...(r.closing_inventory !== undefined ? { 'Closing Inventory': Number(r.closing_inventory) || 0 } : {}),
        ...(r.remark ? { 'Remark': r.remark } : {}),
        ...(r.asset_type ? { 'Asset Type': r.asset_type } : {}),
        ...(r.implemented ? { 'Implemented': r.implemented } : {}),
        ...(r.brand_available ? { 'Brand Available': r.brand_available } : {}),
        ...(r.brand_remark ? { 'Brand Remark': r.brand_remark } : {}),
        ...(r.fillup_status ? { 'Fillup Status': r.fillup_status } : {}),
        ...(r.uniform_status ? { 'Uniform Status': r.uniform_status } : {}),
        ...(r.uniform_reason ? { 'Uniform Reason': r.uniform_reason } : {})
      }));

      return res.status(200).json({
        error: false,
        statusCode: 200,
        data: formatted
      });
    } catch (err) {
      console.error('exportGenericReport error:', err);
      return res.status(200).json({ error: false, statusCode: 200, data: [] });
    }
  },
};
