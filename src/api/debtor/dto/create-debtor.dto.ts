import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDebtorDto {
  @ApiProperty({
    example: 'Muhammadaziz Gulomov',
    description: 'Full name of the debtor',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'toshkent', description: 'Address of the debtor' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({
    example: 'he is very angry',
    description: 'Description of the debtor',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Store ID associated with the debtor' })
  @IsString()
  @IsOptional()
  store: string;
}
