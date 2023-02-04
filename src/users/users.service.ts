import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly database: DBService) {}
  create(dto: CreateUserDto) {
    dto.version = 1;
    dto.createdAt = +new Date();
    dto.updatedAt = +new Date();
    const result = this.database.create(dto);
    delete result.password;
    return result;
  }

  findAll() {
    const result = this.database.findAll().map((item) => {
      delete item.password;
      return item;
    });
    return result;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.findOne(id);
    if (!result) throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    delete result.password;
    return result;
  }

  update(id: string, dto: UpdatePasswordDto) {
    if (!dto.newPassword && !dto.oldPassword) {
      throw new HttpException('DTO for this request is not correct', HttpStatus.BAD_REQUEST);
    }
    if (!uuidValidate(id)) {
      throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }
    const user = this.database.findOne(id);
    if (!user) {
      throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    user.version += 1;
    user.password = dto.newPassword;
    user.updatedAt = +new Date();
    const result = this.database.update(id, user);

    if (!result) {
      throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    delete result.password;
    return result;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    const result = this.database.remove(id);
    if (!result) throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }
}
