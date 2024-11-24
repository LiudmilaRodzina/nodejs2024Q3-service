import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ValidateIf((obj) => obj.albumId !== null)
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsPositive()
  duration: number;
}
