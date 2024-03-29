require('dotenv').config();
const express = require('express');
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cloundinary = require('./src/utils/cloudinary')
require('./firebaseConfig.js')

const webRoutes = require('./src/routes/index');
const sequelize = require("./src/database/connectDbPg");

const db = require('./src/model/index')

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';

app.use(
    cors({
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    })
);

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v3', webRoutes);

// Connect to the database
sequelize
    .authenticate()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

server.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
});
