const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// console.log("mysql", process.env.DB_DSN)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'booking_web',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '123456',
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: 0,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);
module.exports = sequelize;