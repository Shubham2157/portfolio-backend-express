const { User } = require("../model/user");

const auth = async (req, res, next) =>{
    const user = await User.find();
    try {
        if (req.headers.authorization.split(" ")[1] === user[0].token) {
            next()
        } else {
            res.status(401).json({"errors":[{"title":"Not authorized","detail":"Not authorized","code":"401","status":"401"}]})
        }
    } catch (error) {
        res.status(401).json({"errors":[{"title":"Not authorized","detail":"Not authorized","code":"401","status":"401"}]})
    }
}

module.exports = auth;