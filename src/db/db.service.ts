import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: {
    tracks: Array<string>;
    artists: Array<string>;
    albums: Array<string>;
  };

  constructor() {
    this.favorites = {
      albums: [],
      tracks: [],
      artists: [],
    };
  }

  // findAllUsers() {
  //   return this.users;
  // }

  // findOneUser(id: string) {
  //   return this.users.find((record) => record.id === id);
  // }

  // createUser(dto: CreateUserDto) {
  //   const uuid = uuidv4();
  //   this.users.push({ id: uuid, ...dto });
  //   const res = { ...this.users[this.users.length - 1] };
  //   return res;
  // }

  // updateUser(id: string, dto: UpdateUserDto) {
  //   let user = this.users.find((record) => record.id === id);
  //   if (!user) return false;
  //   user = { ...user, ...dto };
  //   return user;
  // }

  // removeUser(id: string) {
  //   const indexOfUser = this.users.findIndex((record) => record.id === id);
  //   if (indexOfUser >= 0) {
  //     this.users.splice(indexOfUser, 1);
  //   }
  //   return indexOfUser === -1 ? false : true;
  // }

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
      const deletedATrack = this.tracks.splice(indexOfTrack, 1);
      const favoriteTrackstWhitoutDeleted = this.favorites.tracks.filter((item) => {
        return item !== deletedATrack[0].id;
      });
      this.favorites.tracks = favoriteTrackstWhitoutDeleted;
    }
    return indexOfTrack === -1 ? false : true;
  }

  findAllArtists() {
    return this.artists;
  }

  findOneArtist(id: string) {
    return this.artists.find((record) => record.id === id);
  }

  createArtist(dto: CreateArtistDto) {
    const uuid = uuidv4();
    this.artists.push({ id: uuid, ...dto });
    const res = { ...this.artists[this.artists.length - 1] };
    return res;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    let artist = this.artists.find((record) => record.id === id);
    if (!artist) return false;
    artist = { ...artist, ...dto };
    return artist;
  }

  removeArtist(id: string) {
    const indexOfArtist = this.artists.findIndex((record) => record.id === id);
    if (indexOfArtist >= 0) {
      const deletedArtistst = this.artists.splice(indexOfArtist, 1);

      const tracksOfArtist = this.tracks.filter((track) => {
        return track.artistId === deletedArtistst[0].id;
      });

      const albumsOfArtist = this.albums.filter((album) => {
        return album.artistId === deletedArtistst[0].id;
      });

      tracksOfArtist.forEach((track) => (track.artistId = null));
      albumsOfArtist.forEach((album) => (album.artistId = null));

      const favoriteArtistWhitoutDeleted = this.favorites.artists.filter((item) => {
        return item !== deletedArtistst[0].id;
      });

      this.favorites.artists = favoriteArtistWhitoutDeleted;
    }
    return indexOfArtist === -1 ? false : true;
  }

  findAllAlbums() {
    return this.albums;
  }

  findOneAlbum(id: string) {
    return this.albums.find((record) => record.id === id);
  }

  createAlbum(dto: CreateAlbumDto) {
    const uuid = uuidv4();
    this.albums.push({ id: uuid, ...dto });
    const res = { ...this.albums[this.albums.length - 1] };
    return res;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    let album = this.albums.find((record) => record.id === id);
    if (!album) return false;
    album = { ...album, ...dto };
    return album;
  }

  removeAlbum(id: string) {
    const indexOfAlbum = this.albums.findIndex((record) => record.id === id);
    if (indexOfAlbum >= 0) {
      const deletedAlbum = this.albums.splice(indexOfAlbum, 1);
      const tracksOfAlbum = this.tracks.filter((track) => {
        return track.albumId === deletedAlbum[0].id;
      });
      tracksOfAlbum.forEach((track) => (track.albumId = null));
      const favoriteAlbumsWhitoutDeleted = this.favorites.albums.filter((item) => {
        return item !== deletedAlbum[0].id;
      });
      this.favorites.albums = favoriteAlbumsWhitoutDeleted;
    }
    return indexOfAlbum === -1 ? false : true;
  }

  getAllFavorites() {
    const favTracks: Track[] = [];
    this.favorites.tracks.forEach((id) => {
      const item = this.findOneTrack(id);
      if (item) favTracks.push(item);
    });
    const favAlbums: Album[] = [];
    this.favorites.albums.forEach((id) => {
      const item = this.findOneAlbum(id);
      if (item) favAlbums.push(item);
    });
    const favArtists: Artist[] = [];
    this.favorites.artists.forEach((id) => {
      const item = this.findOneArtist(id);
      if (item) favArtists.push(item);
    });
    return { tracks: favTracks, albums: favAlbums, artists: favArtists };
  }

  addTrackToFavorites(id: string) {
    if (this.tracks.findIndex((record) => record.id === id) >= 0) {
      this.favorites.tracks.push(id);
      return true;
    }
    return false;
  }

  removeTrackFromFavorites(id: string) {
    const indexOfTrack = this.favorites.tracks.findIndex((record) => record === id);
    if (indexOfTrack >= 0) {
      this.favorites.tracks.splice(indexOfTrack, 1);
    }
    return indexOfTrack === -1 ? false : true;
  }

  addAlbumToFavorites(id: string) {
    if (this.albums.findIndex((record) => record.id === id) >= 0) {
      this.favorites.albums.push(id);
      return true;
    }
    return false;
  }

  removeAlbumFromFavorites(id: string) {
    const indexOfAlbum = this.favorites.albums.findIndex((record) => record === id);
    if (indexOfAlbum >= 0) {
      this.favorites.albums.splice(indexOfAlbum, 1);
    }
    return indexOfAlbum === -1 ? false : true;
  }

  addArtistToFavorites(id: string) {
    if (this.artists.findIndex((record) => record.id === id) >= 0) {
      this.favorites.artists.push(id);
      return true;
    }
    return false;
  }

  removeArtistFromFavorites(id: string) {
    const indexOfArtist = this.favorites.artists.findIndex((record) => record === id);
    if (indexOfArtist >= 0) {
      this.favorites.artists.splice(indexOfArtist, 1);
    }
    return indexOfArtist === -1 ? false : true;
  }
}
