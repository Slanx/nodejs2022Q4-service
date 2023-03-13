import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateTokenDto {
  user: User;

  @IsString()
  @IsNotEmpty()
  token: string;
}
