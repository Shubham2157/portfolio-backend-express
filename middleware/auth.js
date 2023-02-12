const { User } = require("../model/user");
var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
        try {
            var decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
            const user = await User.findOne({ 'email': decoded.email });
            if (user !== null) {
                next()
            } else {
                res.status(401).json({ "errors": [{ "title": "Not authorized", "detail": "Not authorized", "code": "401", "status": "401" }] })
            }
        } catch (error) {
            res.status(401).json({ "errors": [{ "title": "Not authorized", "code": "401", "status": error }] })
        }
}

module.exports = auth;