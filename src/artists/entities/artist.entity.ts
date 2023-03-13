import { IsUUID, IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class Artist {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
