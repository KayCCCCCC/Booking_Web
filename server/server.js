const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const webRoutes = require('./src/routes/index');
const sequelize = require("./src/database/connectDbPg");

const app = express();
const router = express.Router();
const port = 8080;

const { scheduleBookingStatusUpdate, scheduleCheckCancelledBookings } = require('./src/service/setInterval.js');

// Middleware: log request method
router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
});

// Middleware: parse incoming requests with JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware: parse cookies
app.use(cookieParser());

// Middleware: enable CORS
app.use(cors());

// Middleware: serve static files from 'views' directory
const viewsPath = path.join(__dirname, 'views');
app.use(express.static(viewsPath));

// Define routes
app.use('/api/v3', webRoutes);

// Route: handle root URL
app.get('/', (req, res) => {
    res.send("Hello");
});

// Connect to database
sequelize.authenticate()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });


// Schedule tasks
scheduleBookingStatusUpdate();
scheduleCheckCancelledBookings();

// Start server
app.listen(port, function () {
    console.log(`Example app listening on http://localhost:${port}`);
});
