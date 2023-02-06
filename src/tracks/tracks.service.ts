import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

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

  findOne = (id: string) => {
    const track = this.tracks.find((track) => track.id === id);

    return track;
  };

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

  removeDependencies = async <T extends keyof Track>(
    dependency: T,
    id: string,
  ) => {
    this.tracks.forEach((track) => {
      if (track[dependency] === id) track[dependency] = null;
    });
  };
}
