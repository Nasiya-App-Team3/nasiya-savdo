import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../common/database/index';

@Entity({ name: 'admins' })
export class Admin extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column()
  hashed_password: string;

  @Column()
  phone_number: string;
}
