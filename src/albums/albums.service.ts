import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBService } from 'src/db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DBService, private readonly logger: LoggerService) {}

  findAll() {
    const result = this.database.findAllAlbums();
    this.logger.res(HttpStatus.OK);
    return result;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.findOneAlbum(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.OK);
    return result;
  }

  create(dto: CreateAlbumDto) {
    if (!dto.name || !dto.year) {
      throw new HttpException('Request body does not contain required fields (name, year)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.createAlbum(dto);
    this.logger.res(HttpStatus.CREATED);
    return result;
  }

  update(id: string, dto: UpdateAlbumDto) {
    if ((!dto.name && !dto.year) || (dto.name && typeof dto.name !== 'string') || (dto.year && !Number.isInteger(dto.year))) {
      throw new HttpException('DTO for this request is not correct', HttpStatus.BAD_REQUEST);
    }
    if (!uuidValidate(id)) {
      throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.updateAlbum(id, dto);
    if (!result) {
      throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    this.logger.res(HttpStatus.OK);
    return result;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeAlbum(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.NO_CONTENT);
    return result;
  }
}
