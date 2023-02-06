import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private readonly db: DbService) {}
  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      ...createTrackDto,
      id: randomUUID(),
    };
    this.db.tracks.push(track);

    return track;
  }

  async findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    let updatedTrack: Track;

    this.db.tracks = this.db.tracks.map(({ ...track }) => {
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

  async remove(id: string) {
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
  }

  async removeDependencies<T extends keyof Track>(dependency: T, id: string) {
    this.db.tracks.forEach((track) => {
      if (track[dependency] === id) track[dependency] = null;
    });
  }
}
