import * as Winston from 'winston';

// tslint:disable-next-line
export const Logger = Winston.createLogger({
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({
      filename: `server.log`
    })
  ],
  format: Winston.format.combine(
    Winston.format.timestamp(),
    Winston.format.align(),
    Winston.format.printf(info => {
      const { timestamp, level, message, ...args } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `[${ts}] [${level}] ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    })
  )
});
