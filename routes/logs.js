const express = require('express')
const router = express.Router();

//                 LOGS

router.get("/application.log", (req, res) => {
  const file = `${__dirname}/prodlogs/app.log`
  res.sendFile(file)
})

router.get("/error.log", (req, res) => {
  const file = `${__dirname}/prodlogs/error.log`
  var d = new Date()
  var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
    d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  const filename = `error-logs-${datestring}.log`
  res.download(file, filename)
})

module.exports = router
