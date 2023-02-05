import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
