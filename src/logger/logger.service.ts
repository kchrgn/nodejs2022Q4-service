import { Injectable } from '@nestjs/common';
import { EOL } from 'os';

@Injectable()
export class LoggerService {
  _logLevel: number;
  constructor () {

    let _logLevel: number;
    if (!process.env.LOG_LEVEL) {
      _logLevel = 2;
      return
    };

    if (process.env.LOG_LEVEL === 'none') _logLevel = 0;
    if (process.env.LOG_LEVEL === 'errors') _logLevel = 1;
    if (process.env.LOG_LEVEL === 'all') _logLevel = 2;
  }

  log(message: any) {
    if (this._logLevel < 2 ) return; 
    process.stdout.write(JSON.stringify(message), 'utf-8');
  }

  req(req: any) {
    if (this._logLevel < 2 ) return; 
    process.stdout.write(`Incoming request: url = ${req.url}, query_params = ${JSON.stringify(req.query)}, body = ${JSON.stringify(req.body)}${EOL}`, 'utf-8');
  }

  res(code: number) {
    if (this._logLevel < 2 ) return; 
    process.stdout.write(`Responsed with code = ${code}${EOL}`, 'utf-8');
  }

  error(message: any) {
    if (this._logLevel < 1 ) return; 
    process.stdout.write(JSON.stringify(message), 'utf-8');
  }
}
