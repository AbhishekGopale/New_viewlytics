require("dotenv").config()

const SERVER_CONFIG = {
    key: process.env.KEY || "asdasdasdasd",
    port: process.env.PORT || 5000,
    server_type: process.env.NODE_ENV || "devlopment",
    server_url: process.env.SERVER_PATH
}

const DATABASE_CONFIG = {
    database_host: process.env.DB_HOST || "database-1.clulcoqubs9q.ap-south-1.rds.amazonaws.com",
	database_name: process.env.DB_NAME || "idonneous",
    database_user: process.env.DB_USER || "db_admin",
    database_password: process.env.DB_PASSWORD || "db_idonneous_tt$500",
    database_dialect: process.env.DB_DIALECT || "mysql",
    database_logging: process.env.DB_LOGGING || false,
}

const JWT_CONFIG = {
    secretKey: process.env.JWT_SECRET || "thisistheshubhamprojectdontdoenythinginthisproject",
    expiresIn: process.env.JWT_EXPIRE || "1h",
    AppexpiresIn: process.env.APP_JWT_EXPIRE || "3650d"
}

const TOKEN_CONFIG = {
    resetpassword_local_url: process.env.LOCAL_URL || "http://35.73.254.5/reset_password/"
}

const Image_path = {
    IMAGE_PATHS: process.env.IMAGE_PATH || "http://35.73.254.5/media/upload"
}

const USER_ROLES = {
     'admin' : '1',
     'npm' : '2',
     'asm' : '3',
     'tl' : '4',
    'promoter': '5',
    "merchandiser":"6",
    'ta': '7',
    "npc": '9',
    "cl_asm":"10",
    "se":"11"
}



module.exports = { SERVER_CONFIG, DATABASE_CONFIG, TOKEN_CONFIG, JWT_CONFIG,USER_ROLES,Image_path }