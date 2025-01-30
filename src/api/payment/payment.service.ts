import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { DeepPartial } from 'typeorm';
import { Debt, Payments } from 'src/core/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtRepository, PaymentRepository } from 'src/core/repository';
import { DebtsService } from '../debts/debts.service';
import { addMonths, addDays, differenceInDays } from 'date-fns';
import { DebtStatus } from 'src/common/enum';

@Injectable()
export class PaymentService extends BaseService<
  CreatePaymentDto,
  DeepPartial<Payments>
> {
  constructor(
    @InjectRepository(Payments) repository: PaymentRepository,
    @InjectRepository(Debt) private readonly debtRepo: DebtRepository,
    private readonly debtsService: DebtsService,
  ) {
    super(repository);
  }

  async forAnySum(dto: CreatePaymentDto) {
    const currentDebt = await this.debtsService.findOneById(dto.debtId);

    if (!currentDebt.data) {
      throw new NotFoundException('Debt Not Found');
    }

    if (currentDebt.data.debt_status == 'closed') {
      throw new BadRequestException('Debt Is Closed');
    }

    try {
      const newPayment = this.getRepository.create(dto);
      if (+currentDebt.data.debt_sum <= newPayment.sum) {
        currentDebt.data.debt_sum = 0;
        currentDebt.data.debt_status = DebtStatus.CLOSED;
      } else {
        currentDebt.data.debt_sum -= newPayment.sum;

        const monthlyPayment =
          currentDebt.data.total_debt_sum / currentDebt.data.debt_period;

        let nextPaymentDate = new Date(
          currentDebt.data.next_payment_date as string,
        );

        if (newPayment.sum >= monthlyPayment) {
          const monthsPaid = Math.floor(newPayment.sum / monthlyPayment);
          const remainingAmount = newPayment.sum % monthlyPayment;

          nextPaymentDate = addMonths(nextPaymentDate, monthsPaid);

          if (remainingAmount > 0) {
            const daysInMonth = differenceInDays(
              addMonths(nextPaymentDate, 1),
              nextPaymentDate,
            );
            const daysToAdd = Math.floor(
              (remainingAmount / monthlyPayment) * daysInMonth,
            );
            nextPaymentDate = addDays(nextPaymentDate, daysToAdd);
          }
        } else {
          const daysInMonth = differenceInDays(
            addMonths(nextPaymentDate, 1),
            nextPaymentDate,
          );
          const daysToAdd = Math.floor(
            (newPayment.sum / monthlyPayment) * daysInMonth,
          );
          nextPaymentDate = addDays(nextPaymentDate, daysToAdd);
        }

        currentDebt.data.next_payment_date = nextPaymentDate
          .toISOString()
          .split('T')[0];
      }

      console.log({ debt: currentDebt.data });
      await this.getRepository.save(newPayment);
      await this.debtRepo.update(currentDebt.data.id, currentDebt.data);

      return {
        status_code: 201,
        message: 'success',
        data: newPayment,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Transaction Failed');
    }
  }
}
