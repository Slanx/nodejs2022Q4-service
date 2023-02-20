import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesArtists {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  artists: Artist;
}

@Entity()
export class FavoritesAlbums {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  albums: Album;
}

export class FavoritesTracks {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  tracks: Track;
}
