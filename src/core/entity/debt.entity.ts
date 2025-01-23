import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../common/database/index';
import { Debtor } from './debtor.entity';
import { DebtPeriod } from '../../common/enum/index';
import { Payments } from './payment.entity';
import { ImagesOfDebts } from './images-of-debts.entity';

@Entity({ name: 'debts' })
export class Debt extends BaseModel {
  @Column()
  debt_date: Date;

  @Column()
  debt_period: DebtPeriod;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  debt_sum: number;

  @Column()
  description: string;

  @ManyToOne(() => Debtor, (debtor) => debtor.debts, { onDelete: 'CASCADE' })
  debtor: Debtor;

  @OneToMany(() => Payments, (payments) => payments.debt)
  payments: Payments[];

  @OneToMany(() => ImagesOfDebts, (images) => images.debt)
  images: ImagesOfDebts[];
}
