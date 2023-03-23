import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create({ ...createTrackDto });

    return this.trackRepository.save(track);
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('This track does not exist');
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.preload({
      id,
      ...updateTrackDto,
    });

    return this.trackRepository.save(track);
  }

  async remove(track: Track) {
    await this.trackRepository.remove(track);
  }
}
