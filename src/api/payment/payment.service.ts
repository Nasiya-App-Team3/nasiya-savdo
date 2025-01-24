import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { DeepPartial } from 'typeorm';
import { Payments } from 'src/core/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/core/repository';
import { DebtsService } from '../debts/debts.service';

@Injectable()
export class PaymentService extends BaseService<
  CreatePaymentDto,
  DeepPartial<Payments>
> {
  constructor(
    @InjectRepository(Payments) repository: PaymentRepository,
    private readonly debtsService: DebtsService,
  ) {
    super(repository);
  }

  async create(dto: CreatePaymentDto) {
    await this.debtsService.findOneById(dto.debtId);
    let created_data = this.getRepository.create({
      ...dto,
    }) as unknown as Payments;
    created_data = await this.getRepository.save(created_data);
    return {
      status_code: 201,
      message: 'success',
      data: created_data,
    };
  }
}
