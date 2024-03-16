const jwt = require('jsonwebtoken')
const { getAuth } = require('firebase-admin/auth')
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
    // console.log('userId: ', userId)
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

const authorizationJWTGG = async (req, res, next) => {
    console.log({ authorization: req.headers.authorization });
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];

        getAuth()
            .verifyIdToken(accessToken)
            .then((decodedToken) => {
                console.log({ decodedToken });
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch((err) => {
                console.log({ err });
                return res.status(403).json({ message: 'Forbidden', error: err });
            });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    authorizationJWTGG
}