const mongoose = require("mongoose")
var logger = require('./logger')

mongoose.set("strictQuery", false);

var database = mongoose.connect(
  process.env.DB_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", logger.error.bind(console, "connection error: "))
db.once("open", function () {
    logger.info("Connected to database successfully")
});


module.exports = database