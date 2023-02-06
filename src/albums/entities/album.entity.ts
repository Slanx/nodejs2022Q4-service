import {
  IsUUID,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Album {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
