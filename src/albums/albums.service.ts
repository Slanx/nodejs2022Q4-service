import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: DbService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      ...createAlbumDto,
      id: randomUUID(),
    };
    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let updatedAlbum: Album;

    this.db.albums = this.db.albums.map(({ ...album }) => {
      if (album.id === id) {
        updatedAlbum = {
          ...album,
          ...updateAlbumDto,
        };

        return updatedAlbum;
      }

      return album;
    });

    return updatedAlbum;
  }

  remove(id: string) {
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }

  async removeDependencies<T extends keyof Album>(dependency: T, id: string) {
    this.db.albums.forEach((album) => {
      if (album[dependency] === id) album[dependency] = null;
    });
  }
}
