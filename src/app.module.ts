import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../ormconfig';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule, AlbumsModule, FavoritesModule, TypeOrmModule.forRoot(configService)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
