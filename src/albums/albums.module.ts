import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoritesService, TracksService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
