import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { DebtPeriod } from 'src/common/enum';

export class DebtDto {
  @ApiProperty({
    description: 'The next payment date',
    example: '2025-02-22',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  next_payment_date?: Date;

  @ApiProperty({
    description: 'The payment period for the debt',
    enum: DebtPeriod,
    example: DebtPeriod.MONTH3,
  })
  @IsNotEmpty()
  @IsEnum(DebtPeriod)
  debt_period: DebtPeriod;

  @ApiProperty({
    description: 'The debt amount',
    example: 1500.75,
    type: 'number',
  })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  debt_sum: number;

  @IsOptional()
  total_debt_sum: number;

  @ApiProperty({
    description: 'A description of the debt',
    example: 'Debt for January 2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  images: string[];

  @ApiProperty({
    description: 'The ID of the debtor',
    example: 'debtor-12345',
  })
  @IsNotEmpty()
  debtor: string;

  @ApiProperty({
    description: 'The status of the debt',
    example: 'active',
    required: false,
  })
  @IsOptional()
  @IsString()
  debt_status?: string;
}
