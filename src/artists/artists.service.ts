import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [
    {
      id: '5dee1117-5ecb-42e2-a546-1a20fa113750',
      name: 'Aqua',
      grammy: false,
    },
  ];
  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      ...createArtistDto,
      id: randomUUID(),
    };
    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    let updatedArtist: Artist;

    this.artists = this.artists.map(({ ...artist }) => {
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
    this.artists = this.artists.filter((track) => track.id !== id);
  }
}
