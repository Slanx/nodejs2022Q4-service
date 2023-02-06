import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

export class GetFavoritesDto {
  artists?: Artist[];
  albums?: Album[];
  tracks?: Track[];
}
