import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStoresDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'login for the owner of the store',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @ApiProperty({
    example: 'qwert12345',
    description: 'hashed_password of the store',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  hashed_password: string;

  @ApiProperty({ example: 1234, description: '4-digit PIN code for the store' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @MinLength(4)
  pin_code: number;

  @ApiProperty({
    example: 1000.0,
    description: 'Initial balance of the store',
    default: 1000.0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  wallet: number;

  @ApiProperty({
    example: 'Image',
    description: 'Image for the store',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  image?: string;
}
