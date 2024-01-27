import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UnsplashDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1598946114829-162ee19ac506?ixid=M3w1NTkwMDd8MHwxfHNlYXJjaHwxfHx2cG58ZW58MHx8fHwxNzA2MzU5MTQ4fDA&ixlib=rb-4.0.3',
    description: 'url',
    required: true,
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'nombre-de-imagen.png',
    description: 'filename',
    required: true,
  })
  filename: string;
}
