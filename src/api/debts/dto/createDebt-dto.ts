import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { DebtPeriod } from 'src/common/enum';

export class DebtDto {
  @ApiProperty({
    description: 'The date when the debt was created',
    example: '2025-01-22',
  })
  @IsNotEmpty()
  @IsDateString()
  debt_date: string;

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

  @ApiProperty({
    description: 'A description of the debt',
    example: 'Debt for January 2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the debtor',
    example: 'debtor-12345',
  })
  @IsNotEmpty()
  debtor: string;
}
