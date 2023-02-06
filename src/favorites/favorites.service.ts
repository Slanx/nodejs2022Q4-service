import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  async create<T extends keyof Favorites>(key: T, id: string) {
    this.db.favorites[key].push(id);
  }

  async findAll() {
    return this.db.favorites;
  }

  async findOne<T extends keyof Favorites>(key: T, id: string) {
    return this.db.favorites[key].find((favorite) => favorite === id);
  }

  async remove<T extends keyof Favorites>(key: T, id: string) {
    this.db.favorites[key] = this.db.favorites[key].filter((favorite) => {
      favorite !== id;
    });
  }
}
