const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'booking_web',
    process.env.DB_USER_PG || 'postgres',
    process.env.DB_PASSWORD || '123456',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

module.exports = sequelize;
