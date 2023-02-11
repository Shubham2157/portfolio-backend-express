require('dotenv').config()
const app = require("./app")
var logger = require('./config/logger')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  logger.info(`Express server is running on port ${PORT}`)
})