import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create({ ...createArtistDto });

    return this.artistRepository.save(artist);
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('This artist does not exist');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.preload({
      id,
      ...updateArtistDto,
    });

    return this.artistRepository.save(artist);
  }

  async remove(artist: Artist) {
    await this.artistRepository.remove(artist);
  }
}
