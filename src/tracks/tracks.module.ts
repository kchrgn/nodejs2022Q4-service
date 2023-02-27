import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBModule } from 'src/db/db.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [DBModule, LoggerModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
