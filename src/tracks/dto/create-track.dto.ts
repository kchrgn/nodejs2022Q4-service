import { ApiProperty,  ApiPropertyOptional } from '@nestjs/swagger';
export class CreateTrackDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist
  @ApiPropertyOptional()
  albumId: string | null; // refers to Album
  @ApiProperty()
  duration: number; // integer number
}
