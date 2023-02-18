import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBService } from '../db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DBService) {}

  findAll() {
    const result = this.database.findAllAlbums();
    return result;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.findOneAlbum(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }

  create(dto: CreateAlbumDto) {
    if (!dto.name || !dto.year) {
      throw new HttpException('Request body does not contain required fields (name, year)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.createAlbum(dto);
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
    return result;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Album id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeAlbum(id);
    if (!result) throw new HttpException(`Album with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }
}
