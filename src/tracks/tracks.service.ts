import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DBService } from 'src/db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class TracksService {
  constructor(private readonly database: DBService, private readonly logger: LoggerService) {}

  findAll() {
    const result = this.database.findAllTracks();
    this.logger.res(HttpStatus.OK);
    return result;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Track id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.findOneTrack(id);
    if (!result) throw new HttpException(`Track with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.OK);
    return result;
  }

  create(dto: CreateTrackDto) {
    if (!dto.name || !dto.duration) {
      throw new HttpException('Request body does not contain required fields (login, password)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.createTrack(dto);
    this.logger.res(HttpStatus.CREATED);
    return result;
  }

  update(id: string, dto: UpdateTrackDto) {
    if ((!dto.name && !dto.duration) || (dto.duration && !Number.isInteger(dto.duration)) || (dto.artistId && !uuidValidate(dto.artistId)) || (dto.albumId && !uuidValidate(dto.albumId))) {
      throw new HttpException('DTO for this request is not correct', HttpStatus.BAD_REQUEST);
    }
    if (!uuidValidate(id)) {
      throw new HttpException('Track id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.updateTrack(id, dto);
    if (!result) {
      throw new HttpException(`Track with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    this.logger.res(HttpStatus.OK);
    return result;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeTrack(id);
    if (!result) throw new HttpException(`Track with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    this.logger.res(HttpStatus.NO_CONTENT);
    return result;
  }
}
