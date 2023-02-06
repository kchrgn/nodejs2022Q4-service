import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAlbumDto {
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist
}
