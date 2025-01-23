import { Column, Entity, ManyToOne } from 'typeorm';
import { Debtor } from './debtor.entity';
import { BaseModel } from 'src/common/database';

@Entity()
export class PhoneNumbersOfDebtors extends BaseModel {
  @Column()
  image: string;

  @ManyToOne(() => Debtor, (debtor) => debtor.phone_numbers, {
    onDelete: 'CASCADE',
  })
  debtor: Debtor;
}
