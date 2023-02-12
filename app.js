const express = require('express')
const app = express()
app.use(express.json());

var logger = require('./config/logger')

// database connection
var database = require('./config/database')

app.get('/', (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    res.send("WELCOME TO MY BLOG/PORTFOLIO")
})

app.use("/logs/downloads", require("./routes/logs"));
app.use("/api/project", require("./routes/projects"));
app.use("/api/user", require("./routes/users"));


module.exports = app