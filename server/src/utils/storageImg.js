const multer = require("multer");

let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'src/public');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
