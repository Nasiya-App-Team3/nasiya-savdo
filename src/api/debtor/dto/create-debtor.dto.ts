import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDebtorDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  description: string;

  @IsOptional()
  store: string;
}
