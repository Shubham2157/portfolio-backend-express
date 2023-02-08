const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const PORT = process.env.PORT || 3001
const IP = process.env.IP || "127.0.0.1"

var options = {
    file: {
      level: 'info',
      name: 'file.info',
      filename: `./logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    errorFile: {
      level: 'error',
      name: 'file.error',
      filename: `./logs/error.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] [${level.toUpperCase()}]: ${message}`;
  });

var logger = createLogger({
    format: combine(
        label({ label: `${IP}:${PORT}` }),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
      ),
    transports: [
        new (transports.Console)(options.console),
        new transports.File(options.file),
        new transports.File(options.errorFile)
    ],
    exitOnError: false
});

module.exports = logger;