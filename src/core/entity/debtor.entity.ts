import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../common/database/index';
import { Store } from './store.entity';
import { Debt } from './debt.entity';

@Entity({ name: 'debtors' })
export class Debtor extends BaseModel {
  @Column()
  full_name: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @ManyToOne(() => Store, (store) => store.debtors, { onDelete: 'CASCADE' })
  store: Store;

  @OneToMany(() => Debt, (debt) => debt.debtor)
  debts: Debt[];
}
