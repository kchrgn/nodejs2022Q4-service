import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly database: DBService, private readonly logger: LoggerService) {}

  findAllFavorites() {
    this.logger.res(HttpStatus.OK);
    return this.database.getAllFavorites();
  }

  addTrack(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Track id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.addTrackToFavorites(id);
    if (!result) throw new HttpException(`Track with id = ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.logger.res(HttpStatus.CREATED);
    return result;
  }

  removeTrack(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Track id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeTrackFromFavorites(id);
    if (!result) throw new HttpException(`Track with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.NO_CONTENT);
    return result;
  }

  addAlbum(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.addAlbumToFavorites(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.logger.res(HttpStatus.CREATED);
    return result;
  }

  removeAlbum(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeAlbumFromFavorites(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.NO_CONTENT);
    return result;
  }

  addArtist(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Artist id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.addArtistToFavorites(id);
    if (!result) throw new HttpException(`Artist with id = ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.logger.res(HttpStatus.CREATED);
    return result;
  }

  removeArtist(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Artist id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeArtistFromFavorites(id);
    if (!result) throw new HttpException(`Artist with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.NO_CONTENT);
    return result;
  }
}
