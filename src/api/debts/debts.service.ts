import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { Debt } from 'src/core/entity/index';
import { DebtRepository } from 'src/core/repository/index';
import { DebtDto } from './dto/createDebt-dto';

@Injectable()
export class DebtsService extends BaseService<DebtDto, DeepPartial<Debt>> {
  constructor(@InjectRepository(Debt) repository: DebtRepository) {
    super(repository);
  }
}
