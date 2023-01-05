const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            jwt.verify(token, "Secret_key", function (err, decode) {
                if (err) {
                    if (err.name == "TokenExpiredError") {
                        return res.status(401).json({
                            message: "Token Expired"
                        });
                    }
                    else {
                        return res.json({
                            message: "Authentication failed"
                        })
                    }
                }
                req.user = decode
                next();
            });
        } else {
            return res.json({
                message: "No Token Provided"
            })
        }
    } catch (err) {
        console.log(err)
        return res.json({
            message: "Internal Server Error."
        })
    }
}

module.exports = authenticate;