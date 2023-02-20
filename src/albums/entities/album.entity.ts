import { Artist } from 'src/artists/entities/artist.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: Artist['id'] | null;

  @ManyToOne(() => Artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;
}
