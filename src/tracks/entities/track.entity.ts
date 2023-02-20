import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: Artist['id'] | null;

  @Column({ nullable: true })
  albumId: Album['id'] | null;

  @ManyToOne(() => Artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artist | null;

  @ManyToOne(() => Album, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: Album | null;
}
