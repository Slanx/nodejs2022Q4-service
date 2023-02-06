import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { GetFavoritesDto } from './dto/get-favorite.dto';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('This track does not exist');
    }

    await this.favoritesService.create('tracks', id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('This album does not exist');
    }

    await this.favoritesService.create('albums', id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = this.artistsService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('This artist does not exist');
    }

    await this.favoritesService.create('artists', id);
  }

  @Get()
  async findAll(): Promise<GetFavoritesDto> {
    const favorites = await this.favoritesService.findAll();

    const albums = favorites.albums.map((albumId) => {
      return this.albumsService.findOne(albumId);
    });

    const tracks = favorites.tracks.map((trackId) => {
      return this.tracksService.findOne(trackId);
    });

    const artists = favorites.artists.map((artistId) => {
      return this.artistsService.findOne(artistId);
    });

    return {
      albums,
      tracks,
      artists,
    };
  }

  @Delete('track/:id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.favoritesService.findOne('tracks', id);

    if (!track) {
      throw new NotFoundException(
        'This track has not been added to favorites.',
      );
    }

    await this.favoritesService.remove('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.favoritesService.findOne('tracks', id);

    if (!track) {
      throw new NotFoundException(
        'This track has not been added to favorites.',
      );
    }

    await this.favoritesService.remove('tracks', id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.favoritesService.findOne('albums', id);

    if (!album) {
      throw new NotFoundException(
        'This album has not been added to favorites.',
      );
    }

    await this.favoritesService.remove('albums', id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoritesService.findOne('artists', id);

    if (!artist) {
      throw new NotFoundException(
        'This artist has not been added to favorites.',
      );
    }

    await this.favoritesService.remove('artists', id);
  }
}
