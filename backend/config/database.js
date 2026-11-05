const Sequelize = require('sequelize');
const { DATABASE_CONFIG } = require("./application");

const DB = new Sequelize.Sequelize(
	DATABASE_CONFIG.database_name,
	DATABASE_CONFIG.database_user,
	DATABASE_CONFIG.database_password,
	{
		dialect: 'mysql',
		host: DATABASE_CONFIG.database_host,
		logging: (query, time) => {
			// console.log(time + 'ms' + ' ' + query);
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		timezone: '+05:30',
		// query:{raw:true,nest : true},
		omitNull: true
	},
);

try {
	DB.authenticate();
	console.log('Database Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}




module.exports = {
	DB, // connect instance 
	Sequelize, // library
}