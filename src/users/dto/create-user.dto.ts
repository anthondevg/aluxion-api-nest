import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ example: 'mail', description: 'Provider used in sign up' })
  provider: string = 'mail';
  resetToken: string | null;
  expiryDate: Date;
}
