import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoritesAlbums,
  FavoritesArtists,
  FavoritesTracks,
} from './entities/favorite.entity';
import { AlbumsModule } from 'src/modules/albums/albums.module';
import { ArtistsModule } from 'src/modules/artists/artists.module';
import { TracksModule } from 'src/modules/tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesAlbums,
      FavoritesArtists,
      FavoritesTracks,
    ]),
    AlbumsModule,
    ArtistsModule,
    TracksModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
