import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @Entity()
// export class FavoritesArtists {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToMany(() => Artist)
//   artists: Artist[];
// }

@Entity()
export class FavoritesAlbums {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[];
}

export class FavoritesTracks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
