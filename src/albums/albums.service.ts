import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create({ ...createAlbumDto });

    return this.albumRepository.save(album);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.preload({
      id,
      ...updateAlbumDto,
    });

    return this.albumRepository.save(album);
  }

  async remove(album: Album) {
    await this.albumRepository.remove(album);
  }
}
