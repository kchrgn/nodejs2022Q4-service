import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@ApiTags('Tracks')
@Controller('track')
@UseFilters(new HttpExceptionFilter())
export class TracksController {
  constructor(private readonly tracksService: TracksService, private readonly logger: LoggerService) {}

  @Get()
  findAll(@Req() request: Request) {
    this.logger.req(request);
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.tracksService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTrackDto, @Req() request: Request) {
    this.logger.req(request);
    return this.tracksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto, @Req() request: Request) {
    this.logger.req(request);
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.tracksService.remove(id);
  }
}
