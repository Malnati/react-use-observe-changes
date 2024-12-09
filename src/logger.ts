import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info', // Set the log level from environment variable or default to 'info'
    format: combine(
        colorize(),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console()
    ]
});

export default logger;