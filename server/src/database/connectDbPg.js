const { Sequelize } = require("sequelize");
require("dotenv").config();

// console.log("postgres", process.env.DB_DSN)
// const sequelize = new Sequelize(process.env.DB_DSN)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_PG,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
