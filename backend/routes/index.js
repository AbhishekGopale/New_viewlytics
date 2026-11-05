
const webRoutes = require("../app/web/routes/index");
const appRoutes = require("../app/mobile/routes/index");
const adminRoutes = require("../app/admin/routes/index");



const initialize = (app) => {
    app.use("/api/v1/app", appRoutes);
    app.use("/api/v1/admin", adminRoutes);
    app.use("/api/v1/web", webRoutes);

}


module.exports = { initialize };