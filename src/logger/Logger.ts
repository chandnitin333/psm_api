import { createLogger, transports, format } from "winston";

export  class Logger{
    

 public  logger  = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message, metadata }) => {
            return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
              metadata
            )}`;
          })
        ),
      }),
      new transports.File({
        dirname: "logs",
        filename: (new Date()).toISOString().split('T')[0]+".log",
        format: format.combine(format.json()),
      }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
  });

}