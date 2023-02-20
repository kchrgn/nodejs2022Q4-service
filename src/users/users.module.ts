import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DBModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';

@Module({
  imports: [DBModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
