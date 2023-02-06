import {
  IsUUID,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Track {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
