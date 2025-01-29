import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseModel } from '../../common/database/index';
import { Debtor } from './debtor.entity';
import { DebtPeriod } from '../../common/enum/index';
import { Payments } from './payment.entity';
import { ImagesOfDebts } from './images-of-debts.entity';

@Entity({ name: 'debts' })
export class Debt extends BaseModel {
  @Column()
  debt_date: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  next_payment_date: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setNextPaymentDate() {
    if (this.debt_date) {
      const nextPaymentDate = new Date(this.debt_date);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      this.next_payment_date = nextPaymentDate;
    }
  }

  @Column()
  debt_period: DebtPeriod;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  debt_sum: number;

  @Column()
  description: string;

  @ManyToOne(() => Debtor, (debtor) => debtor.debts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  debtor: Debtor;

  @OneToMany(() => Payments, (payments) => payments.debt)
  payments: Payments[];

  @OneToMany(() => ImagesOfDebts, (images) => images.debt)
  images: ImagesOfDebts[];
}
