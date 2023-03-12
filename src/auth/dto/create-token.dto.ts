import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTokenDto {
  user: User;

  @IsString()
  @IsNotEmpty()
  token: string;
}
