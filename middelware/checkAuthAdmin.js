const jwt = require('jsonwebtoken');
const keySecret = "SecretKey";

exports.auth = (req, res, next) => {
    try {
        const token = req.headers['token_authorization'];
        const decode = jwt.verify(token, keySecret);
        if ((decode.exp != 0 && decode.secret == keySecret) || token != undefined)
            next();
        } catch (err) {
            res.status(401).json({
            message: "you are not authinticated!",
        });
    }

}


