const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log('>>> check token: ', token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.id && user?.role === 1) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = async (req, res, next) => {
    const token = await req.headers.authorization.split(' ')[1]
    // console.log('token: ', token)
    const userId = req.params.id
    console.log('userId: ', userId)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        const checkValid = user?.id === JSON.parse(userId)
        // console.log(checkValid)
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (checkValid || user?.role === 1) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}