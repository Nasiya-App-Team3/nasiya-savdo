import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { Debtor } from '../../core/entity/index';
import { DebtorRepository } from '../../core/repository/index';
import { IFindOptions } from 'src/infrastructure/lib/baseService/interface';

export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<Debtor>
> {
  constructor(@InjectRepository(Debtor) repository: DebtorRepository) {
    super(repository);
  }
  async findAll(options?: IFindOptions<DeepPartial<Debtor>>): Promise<{
    status_code: number;
    message: string;
    data: DeepPartial<Debtor>[];
  }> {
    const allStore = await this.getRepository.find(options);

    return {
      status_code: 200,
      message: 'success',
      data: allStore,
    };
  }
}
