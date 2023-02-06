import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  async create<T extends keyof Favorites>(key: T, id: string) {
    this.favorites[key].push(id);
  }

  findAll = async () => {
    return this.favorites;
  };

  findOne = async <T extends keyof Favorites>(key: T, id: string) => {
    return await this.favorites[key].find((favorite) => favorite === id);
  };

  remove = async <T extends keyof Favorites>(key: T, id: string) => {
    await this.favorites[key].filter((favorite) => favorite !== id);
  };
}
