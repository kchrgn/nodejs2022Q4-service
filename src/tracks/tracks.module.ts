import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBService } from 'src/db/db.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DBService],
})
export class TracksModule {}
