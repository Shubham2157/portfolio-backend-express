const express = require('express')
const app = express()
app.use(express.json());

var logger = require('./logger')

// database connection
var database = require('./database')

app.get('/', (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    res.send("WELCOME TO MY BLOG/PORTFOLIO")
})

app.use("/logs", require("./routes/logs"));
app.use("/api/project", require("./routes/projects"));


module.exports = app