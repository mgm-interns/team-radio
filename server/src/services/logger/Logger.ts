import { Service } from 'typedi';
import * as Winston from 'winston';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

@Service()
export class Logger {
  private logger: Winston.Logger;

  constructor() {
    this.logger = Winston.createLogger({
      level: process.env.LOG_LEVEL,
      transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({
          filename: `server.log`
        })
      ],
      format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.align(),
        Winston.format.printf(({ timestamp, level, message, ...args }) => {
          const ts = timestamp.slice(0, 19).replace('T', ' ');
          return `[${ts}] [${level}] ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        })
      )
    });
  }

  public info(arg1: string | object = '', ...meta: any[]) {
    if (typeof arg1 === 'string') {
      return this.logger.info(arg1, ...meta);
    }
    return this.logger.info(arg1);
  }

  public warn(arg1: string | object = '', ...meta: any[]) {
    if (typeof arg1 === 'string') {
      return this.logger.warn(arg1, ...meta);
    }
    return this.logger.warn(arg1);
  }

  public error(arg1: string | object = '', ...meta: any[]) {
    if (typeof arg1 === 'string') {
      return this.logger.error(arg1, ...meta);
    }
    return this.logger.error(arg1);
  }

  public debug(arg1: string | object = '', ...meta: any[]) {
    if (typeof arg1 === 'string') {
      return this.logger.debug(arg1, ...meta);
    }
    return this.logger.debug(arg1);
  }

  public log(level: LogLevel, arg1: string | { message: string; [key: string]: string }, ...meta: any[]) {
    if (typeof arg1 === 'object') {
      return this.logger.log({ level, ...arg1 });
    }
    return this.logger.log(level, arg1, ...meta);
  }
}
