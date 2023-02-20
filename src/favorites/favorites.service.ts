import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  FavoritesAlbums,
  FavoritesArtists,
  FavoritesTracks,
} from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesAlbums)
    private readonly albumFavoritesRepository: Repository<FavoritesAlbums>,
    @InjectRepository(FavoritesArtists)
    private readonly artistFavoritesRepository: Repository<FavoritesArtists>,
    @InjectRepository(FavoritesTracks)
    private readonly trackFavoritesRepository: Repository<FavoritesTracks>,

    private readonly artistsService: ArtistsService,

    private readonly albumsService: AlbumsService,

    private readonly tracksService: TracksService,
  ) {}

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('This track does not exist');
    }

    const trackFavorite = this.trackFavoritesRepository.create({
      tracks: track,
    });

    return this.trackFavoritesRepository.save(trackFavorite);
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('This album does not exist');
    }

    const albumFavorite = this.albumFavoritesRepository.create({
      albums: album,
    });

    return this.albumFavoritesRepository.save(albumFavorite);
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('This artis does not exist');
    }

    const artistFavorite = this.artistFavoritesRepository.create({
      artists: artist,
    });

    return this.artistFavoritesRepository.save(artistFavorite);
  }

  async removeTrack(id: string) {
    const track = await this.trackFavoritesRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(
        'This track has not been added to favorites.',
      );
    }

    await this.trackFavoritesRepository.remove(track);
  }

  async removeArtist(id: string) {
    const artist = await this.artistFavoritesRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(
        'This artist has not been added to favorites.',
      );
    }

    await this.artistFavoritesRepository.remove(artist);
  }

  async removeAlbum(id: string) {
    const album = await this.albumFavoritesRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException(
        'This album has not been added to favorites.',
      );
    }

    await this.albumFavoritesRepository.remove(album);
  }

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.artistFavoritesRepository.find({
        relations: {
          artists: true,
        },
      }),
      this.albumFavoritesRepository.find({
        relations: {
          albums: true,
        },
      }),
      this.trackFavoritesRepository.find({
        relations: {
          tracks: true,
        },
      }),
    ]);

    return { artists, albums, tracks };
  }
}
