import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [
    {
      id: 'ce54b389-4a3c-4f6a-a751-1aabf76aff6e',
      name: 'Aquarium',
      year: 1997,
      artistId: null,
    },
  ];

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      ...createAlbumDto,
      id: randomUUID(),
    };
    this.albums.push(album);

    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let updatedAlbum: Album;

    this.albums = this.albums.map(({ ...album }) => {
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
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
