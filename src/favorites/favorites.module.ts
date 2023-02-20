import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { DbModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoritesAlbums,
  FavoritesArtists,
  FavoritesTracks,
} from './entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesAlbums,
      FavoritesArtists,
      FavoritesTracks,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
