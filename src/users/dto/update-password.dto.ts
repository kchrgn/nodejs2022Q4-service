import { ApiProperty } from '@nestjs/swagger';
export class UpdatePasswordDto {
  @ApiProperty()
  oldPassword: string; // previous password
  @ApiProperty()
  newPassword: string; // new password
}
