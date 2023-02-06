import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('doc', app, JSON.parse(readFileSync('./doc/openapi.json') as unknown as string));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
