const express = require("express");
const app = express();
const path = require("path")
const { SERVER_CONFIG } = require("./config/application");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config()


const { DB } = require('./config/database');

// DB.sync({ force: false });
app.use("/media", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("*", (req, res, next) => {
    res.locals.user = req.user || null
    next()
})



indexRouter.initialize(app);
if (SERVER_CONFIG.server_type == "production") {
    app.use(express.static("../frontend/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve("../", "frontend", "build", "index.html"))
    })
}

process.on('uncaughtException', async err => {
    console.log('uncaughtException ', err)
    // console.error('There was an uncaught error',process.mainModule);
    process.exit(1) //mandatory (as per the Node.js docs)
})

process.on('unhandledRejection', async err => {
    console.error('unhandledRejection ', err)
    // throw err
    process.exit(1) //mandatory (as per the Node.js docs)
})

app.listen(SERVER_CONFIG.port, () => console.log(`🚀 App listening on the port ${SERVER_CONFIG.port}`))