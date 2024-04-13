const { Sequelize } = require("sequelize");
require("dotenv").config();

// console.log("postgres", process.env.DB_DSN)
// const sequelize = new Sequelize(process.env.DB_DSN)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_PG,
    process.env.POSTGRESDB_ROOT_PASSWORD,
    {
        host: process.env.HOST_NAME || 'database-1.cnw6w4ueoxn0.us-east-1.rds.amazonaws.com',
        port: process.env.DB_PORT || '5434',
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
