import { Entity, OneToOne, ManyToOne } from 'typeorm';
import { Debtor } from './debtor.entity';
import { Store } from './store.entity';
import { BaseModel } from 'src/common/database';

@Entity({ name: 'likes' })
export class Likes extends BaseModel {
  @ManyToOne(() => Store, (store) => store.likes, { onDelete: 'CASCADE' })
  store: Store;

  @OneToOne(() => Debtor, (debtor) => debtor.like, { onDelete: 'CASCADE' })
  debtor: Debtor;
}
