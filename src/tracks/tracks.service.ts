import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks: Track[] = [
    {
      id: '046a2c7e-f27a-4b91-baff-a2ef283091e4',
      name: 'Roses are red',
      duration: 208,
      albumId: null,
      artistId: null,
    },
  ];

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      ...createTrackDto,
      id: randomUUID(),
    };
    this.tracks.push(track);

    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    let updatedTrack: Track;

    this.tracks = this.tracks.map(({ ...track }) => {
      if (track.id === id) {
        updatedTrack = {
          ...track,
          ...updateTrackDto,
        };

        return updatedTrack;
      }

      return track;
    });

    return updatedTrack;
  }

  remove(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
