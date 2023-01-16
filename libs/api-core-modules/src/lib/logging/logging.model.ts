import { Logger } from "winston";

import winston = require("winston");

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};

export let winstonLogger: Logger | undefined = undefined;

export const initWinston = (apiTitle: string) => {
  const logger = winston.createLogger({
    level: "debug",
    levels: logLevels,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: apiTitle },
    transports: [
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "logs/combined.log" })
    ],
    exceptionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple()
      }),
      new winston.transports.File({ filename: "logs/exceptions.log" })
    ],
    rejectionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple()
      }),
      new winston.transports.File({ filename: "logs/rejections.log" })
    ]
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }
  winstonLogger = logger;
};
