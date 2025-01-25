import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { Debtor, PhoneNumbersOfDebtors } from '../../core/entity/index';
import {
  DebtorRepository,
  PhoneNumbersOfDebtorsRepository,
} from '../../core/repository/index';
import { IFindOptions } from 'src/infrastructure/lib/baseService/interface';

export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<Debtor>
> {
  constructor(
    @InjectRepository(Debtor) repository: DebtorRepository,
    @InjectRepository(PhoneNumbersOfDebtors)
    private readonly phoneRepo: PhoneNumbersOfDebtorsRepository,
  ) {
    super(repository);
  }

  async create(dto: CreateDebtorDto): Promise<{
    status_code: number;
    message: string;
    data: DeepPartial<Debtor>;
  }> {
    const phone_numbers = dto.phone_numbers;

    const queryRunner =
      this.getRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const newDebtor = this.getRepository.create(dto);
      await queryRunner.manager.save(newDebtor);

      for (const phone_number of phone_numbers) {
        const newPhone = this.phoneRepo.create({
          debtor: { id: newDebtor.id },
          phone_number: phone_number,
        });
        await queryRunner.manager.save(newPhone);
      }

      await queryRunner.commitTransaction();

      return {
        status_code: 201,
        message: 'success',
        data: newDebtor,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return {
        status_code: 400,
        message:
          'Error occurred while creating debtor and phone numbers' +
          error.message,
        data: null,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(options?: IFindOptions<DeepPartial<Debtor>>): Promise<{
    status_code: number;
    message: string;
    data: DeepPartial<Debtor>[];
  }> {
    const allDebtors = await this.getRepository.find(options);

    return {
      status_code: 200,
      message: 'success',
      data: allDebtors,
    };
  }
  async findOneById(
    id: string,
    options?: IFindOptions<DeepPartial<Debtor>>,
  ): Promise<{
    status_code: number;
    message: string;
    data: DeepPartial<Debtor>;
  }> {
    const debtor = await this.getRepository.findOne({
      where: { id, store: options.where },
    });
    return {
      status_code: 200,
      message: 'success',
      data: debtor,
    };
  }
}
