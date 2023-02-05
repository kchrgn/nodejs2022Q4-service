import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBService } from 'src/db/db.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly database: DBService) {}

  findAll() {
    const result = this.database.findAllArtists();
    return result;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Artist id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.findOneArtist(id);
    if (!result) throw new HttpException(`Artist with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }

  create(dto: CreateArtistDto) {
    if (!dto.name || !dto.grammy) {
      throw new HttpException('Request body does not contain required fields (name, grammy)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.createArtist(dto);
    return result;
  }

  update(id: string, dto: UpdateArtistDto) {
    if ((!dto.name && !dto.grammy) || (dto.name && typeof dto.name !== 'string') || (dto.grammy && typeof dto.grammy !== 'boolean')) {
      throw new HttpException('DTO for this request is not correct', HttpStatus.BAD_REQUEST);
    }
    if (!uuidValidate(id)) {
      throw new HttpException('Artist id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }
    const result = this.database.updateArtist(id, dto);
    if (!result) {
      throw new HttpException(`Artist with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException('Artist id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.removeArtist(id);
    if (!result) throw new HttpException(`Artist with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }
}
