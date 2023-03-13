import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  token: string;

  @Column({ nullable: false })
  userId: User['id'];

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
