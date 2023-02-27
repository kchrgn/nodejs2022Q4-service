import { Injectable } from '@nestjs/common';
import { EOL } from 'os';

@Injectable()
export class LoggerService {
  req(req: any) {
    if (+process.env.LOG_LEVEL < 2) return;
    process.stdout.write(`Incoming request: url = ${req.url}, query_params = ${JSON.stringify(req.query)}, body = ${JSON.stringify(req.body)}${EOL}`, 'utf-8');
  }

  res(code: number) {
    if (+process.env.LOG_LEVEL < 2) return;
    process.stdout.write(`Responsed with code = ${code}${EOL}`, 'utf-8');
  }

  error(message: any, code: number) {
    if (+process.env.LOG_LEVEL < 1) return;
    process.stdout.write(`Error. Code = ${code}, message = ${message}${EOL}`);
  }
}
