import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DBService {
  private readonly users: UserEntity[] = [];

  create(dto: CreateUserDto) {
    const uuid = uuidv4();
    this.users.push({ id: uuid, ...dto });
    const res = { ...this.users[this.users.length - 1] };
    return res;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((record) => record.id === id);
  }

  update(id: string, dto: UpdateUserDto) {
    let user = this.users.find((record) => record.id === id);
    if (!user) return false;
    user = { ...user, ...dto };
    return user;
  }

  remove(id: string) {
    const indexOfUser = this.users.findIndex((record) => record.id === id);
    if (indexOfUser >= 0) {
      this.users.splice(indexOfUser, 1);
    }
    return indexOfUser === -1 ? false : true;
  }
}
