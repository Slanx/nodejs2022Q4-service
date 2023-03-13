import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DbService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      ...createArtistDto,
      id: randomUUID(),
    };
    this.db.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    let updatedArtist: Artist;

    this.db.artists = this.db.artists.map(({ ...artist }) => {
      if (artist.id === id) {
        updatedArtist = {
          ...artist,
          ...updateArtistDto,
        };

        return updatedArtist;
      }

      return artist;
    });

    return updatedArtist;
  }

  remove(id: string) {
    this.db.artists = this.db.artists.filter((track) => track.id !== id);
  }
}
