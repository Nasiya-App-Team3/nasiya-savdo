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
  async forMonth(forMonthPayment: CreatePaymentDto, query: any) {
    const queryRunner =
      this.getRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // take month count by query
      let monthCount: number;
      if (typeof query.monthCount !== 'number') {
        monthCount = +query.monthCount;
      } else {
        monthCount = query.monthCount;
      }

      //save new payment
      const newPayment = await this.getRepository.create(forMonthPayment);
      await this.getRepository.save(newPayment);

      // update debts' next payment date
      const currentDebt = await this.debtsService.findOneById(
        forMonthPayment.debtId,
      );
      const currentDebtDate = currentDebt.data.next_payment_date
        ? new Date(
            currentDebt.data.next_payment_date as unknown as string | number,
          )
        : new Date();
      currentDebtDate.setMonth(currentDebtDate.getMonth() + monthCount);

      await this.debtsService.update(forMonthPayment.debtId, {
        next_payment_date: currentDebtDate,
        debt_sum: currentDebt.data.debt_sum - forMonthPayment.sum,
      });
      return newPayment;
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
