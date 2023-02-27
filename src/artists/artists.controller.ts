import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@ApiTags('Artists')
@Controller('artist')
@UseFilters(new HttpExceptionFilter())
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService, private readonly logger: LoggerService) {}

  @Get()
  findAll(@Req() request: Request) {
    this.logger.req(request);
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.artistsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateArtistDto, @Req() request: Request) {
    this.logger.req(request);
    return this.artistsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArtistDto, @Req() request: Request) {
    this.logger.req(request);
    return this.artistsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.artistsService.remove(id);
  }
}
