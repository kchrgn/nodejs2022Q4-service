import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
