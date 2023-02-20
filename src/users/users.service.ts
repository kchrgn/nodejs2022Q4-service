import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly database: DBService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    // const result = this.database.findAllUsers().map((item) => {
    //   delete item.password;
    //   return item;
    // });
    // return result;
    const result = (await this.userRepository.find()).map((user) => user.stripePasssword());
    return result;
  }

  async findOneUser(id: string) {
    if (!uuidValidate(id)) throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    // const result = this.database.findOneUser(id);
    const result = await this.userRepository.findOne({ where: { id } });
    if (!result) throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    // delete result.password;
    return result.stripePasssword();
  }

  async createUser(dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new HttpException('Request body does not contain required fields (login, password)', HttpStatus.BAD_REQUEST);
    }
    dto.version = 1;
    dto.createdAt = +new Date();
    dto.updatedAt = +new Date();
    // const result = this.database.createUser(dto);
    // delete result.password;
    // return result;
    const result = this.userRepository.create(dto);
    return (await this.userRepository.save(result)).stripePasssword();
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    if (!dto.newPassword && !dto.oldPassword) {
      throw new HttpException('DTO for this request is not correct', HttpStatus.BAD_REQUEST);
    }
    if (!uuidValidate(id)) {
      throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }
    // const user = this.database.findOneUser(id);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    user.version += 1;
    user.password = dto.newPassword;
    user.updatedAt = +new Date();
    // const result = this.database.updateUser(id, user);
    const result = await this.userRepository.save(user);
    if (!result) {
      throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    // delete result.password;
    return result.stripePasssword();
  }

  async removeUser(id: string) {
    if (!uuidValidate(id)) throw new HttpException('User id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    // const result = this.database.removeUser(id);
    const result = await this.userRepository.delete(id);
    if (!result) throw new HttpException(`User with id = ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    return result;
  }
}
