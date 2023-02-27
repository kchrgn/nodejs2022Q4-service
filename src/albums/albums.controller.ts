import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService, private readonly logger: LoggerService) {}

  @Get()
  findAll(@Req() request: Request) {
    this.logger.req(request);
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.albumsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAlbumDto, @Req() request: Request) {
    this.logger.req(request);
    return this.albumsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto, @Req() request: Request) {
    this.logger.req(request);
    return this.albumsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.albumsService.remove(id);
  }
}
