import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DBModule } from 'src/db/db.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [DBModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
