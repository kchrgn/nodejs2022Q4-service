import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];

  findAllUsers() {
    return this.users;
  }

  findOneUser(id: string) {
    return this.users.find((record) => record.id === id);
  }

  createUser(dto: CreateUserDto) {
    const uuid = uuidv4();
    this.users.push({ id: uuid, ...dto });
    const res = { ...this.users[this.users.length - 1] };
    return res;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    let user = this.users.find((record) => record.id === id);
    if (!user) return false;
    user = { ...user, ...dto };
    return user;
  }

  removeUser(id: string) {
    const indexOfUser = this.users.findIndex((record) => record.id === id);
    if (indexOfUser >= 0) {
      this.users.splice(indexOfUser, 1);
    }
    return indexOfUser === -1 ? false : true;
  }

  findAllTracks() {
    return this.tracks;
  }

  findOneTrack(id: string) {
    return this.tracks.find((record) => record.id === id);
  }

  createTrack(dto: CreateTrackDto) {
    const uuid = uuidv4();
    this.tracks.push({ id: uuid, ...dto });
    const res = { ...this.tracks[this.tracks.length - 1] };
    return res;
  }

  updateTrack(id: string, dto: UpdateTrackDto) {
    let track = this.tracks.find((record) => record.id === id);
    if (!track) return false;
    track = { ...track, ...dto };
    return track;
  }

  removeTrack(id: string) {
    const indexOfTrack = this.tracks.findIndex((record) => record.id === id);
    if (indexOfTrack >= 0) {
      this.tracks.splice(indexOfTrack, 1);
    }
    return indexOfTrack === -1 ? false : true;
  }
}
