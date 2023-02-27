import { Controller, Get, Post, Param, Delete, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@ApiTags('Favorites')
@Controller('favs')
@UseFilters(new HttpExceptionFilter())
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService, private readonly logger: LoggerService) {}

  @Get()
  findAll(@Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.findAllFavorites();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.addTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/track/:id')
  removeTrack(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.removeTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.addAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/album/:id')
  removeAlbum(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.removeAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.addArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/artist/:id')
  removeArtist(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.favoritesService.removeArtist(id);
  }
}
