const auth = (req, res, next) =>{
    try {
        if (req.headers.apikey === process.env.API_KEY) {
            next()
        } else {
            res.status(401).json({"errors":[{"title":"Not authorized","detail":"Not authorized","code":"401","status":"401"}]})
        }
    } catch (error) {
        res.status(401).json({"errors":[{"title":"Not authorized","detail":"Not authorized","code":"401","status":"401"}]})
    }
}

module.exports = auth;