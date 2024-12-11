import { createLogger, format, transports } from "winston";

const {combine, errors, label, splat, timestamp, printf} = format;

interface LogFormat {
  level: string;
  message: string;
  label?: string;
  timestamp?: string;
}

export const logger = createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    label({ label: "Wigilabs Prueba Tecnica" }),
    splat(),
    timestamp(),
    //@ts-ignore
    printf((info: LogFormat) => {
      const { level, message, label: messageLabel, timestamp: messageTimestamp } = info;
      return `${messageTimestamp} [${messageLabel}] ${level}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});
