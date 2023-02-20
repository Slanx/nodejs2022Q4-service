import {
  FavoritesAlbums,
  FavoritesArtists,
  FavoritesTracks,
} from '../entities/favorite.entity';

export class GetFavoritesDto {
  artists?: FavoritesArtists[];
  albums?: FavoritesAlbums[];
  tracks?: FavoritesTracks[];
}
