import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { Debtor } from '../../core/entity/index';
import { DebtorRepository } from '../../core/repository/index';

export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<Debtor>
> {
  constructor(@InjectRepository(Debtor) repository: DebtorRepository) {
    super(repository);
  }
}
