import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @ValidateIf((_object, value) => value !== null)
  @IsNotEmpty()
  artistId: string | null;
}
