const { Sequelize } = require("sequelize");
require("dotenv").config();

// console.log("postgres", process.env.DB_DSN)
// const sequelize = new Sequelize(process.env.DB_DSN)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'booking_web',
    process.env.DB_USER_PG || 'postgres',
    process.env.DB_PASSWORD || '12345678',
    {
        host: process.env.DB_HOST || 'database-1.cnw6w4ueoxn0.us-east-1.rds.amazonaws.com',
        port: process.env.DB_PORT || '5432',
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
