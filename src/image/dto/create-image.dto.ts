import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ required: true })
  url: string;
  @ApiProperty({ required: false, nullable: true })
  title: string | null;
  @ApiProperty({ required: false, nullable: true })
  description: string | null;
}
