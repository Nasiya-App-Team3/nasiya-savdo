import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '../../common/database/index';
import { Debtor } from './debtor.entity';

@Entity({ name: 'stores' })
export class Store extends BaseModel {
  @Column({ unique: true })
  login: string;

  @Column()
  hashed_password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  wallet: number;

  @Column()
  image: string;

  @Column()
  pin_code: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => Debtor, (debtor) => debtor.store)
  debtors: Debtor[];
}
