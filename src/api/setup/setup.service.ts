import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Debt, Debtor, Store } from 'src/core/entity';
import {
  AdminRepository,
  DebtRepository,
  DebtorRepository,
  StoreRepository,
} from 'src/core/repository';
import { BcryptManage } from 'src/infrastructure/lib/bcrypt';
import { AdminRoles, DebtPeriod } from 'src/common/enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SetupService {
  @InjectRepository(Admin)
  private readonly adminRepo: AdminRepository;

  @InjectRepository(Debtor)
  private readonly debtorRepo: DebtorRepository;

  @InjectRepository(Debt)
  private readonly debtRepo: DebtRepository;

  @InjectRepository(Store)
  private readonly storeRepo: StoreRepository;

  async setup() {
    const hashed_password = await bcrypt.hash(
      'parol',
      await bcrypt.genSalt(10),
    );

    const superAdmin = this.adminRepo.create({
      username: 'superAdmin',
      hashed_password,
      phone_number: '+998912345678',
      role: AdminRoles.SUPERADMIN,
    });

    const admin = this.adminRepo.create({
      username: 'admin',
      hashed_password,
      phone_number: '+998912345679',
      role: AdminRoles.SUPERADMIN,
    });

    const newStore1 = this.storeRepo.create({
      phone_number: '+998901234567',
      email: 'test1@gmail.com',
      login: 'test1',
      hashed_password,
      pin_code: 1234,
    });

    const newStore2 = this.storeRepo.create({
      phone_number: '+998911234567',
      email: 'test2@gmail.com',
      login: 'test2',
      hashed_password,
      pin_code: 4321,
    });

    const debtor1_1 = this.debtorRepo.create({
      full_name: 'Muhammadaziz Gulomov',
      address: 'Andijon',
      description: 'Bu bola yaxshi bola',
      store: newStore1,
    });

    const debtor2_1 = this.debtorRepo.create({
      full_name: 'Asadbek Zaynobiddinov',
      address: `Farg'ona`,
      description: 'Bu bola yaxshi bola',
      store: newStore1,
    });

    const debtor1_2 = this.debtorRepo.create({
      full_name: 'Bekzod Qodirov',
      address: `Namangan`,
      description: 'Bu bola yaxshi bola',
      store: newStore2,
    });

    const debtor2_2 = this.debtorRepo.create({
      full_name: 'Jahongir Zokirov',
      address: `Andijon`,
      description: 'Bu bola yaxshi bola',
      store: newStore2,
    });

    const debts = [
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH3,
        debt_sum: 150000.0,
        debtor: debtor1_1,
        description: '3 oyga 150,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH12,
        debt_sum: 200000.0,
        debtor: debtor1_1,
        description: '12 oyga 200,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH3,
        debt_sum: 150000.0,
        debtor: debtor2_1,
        description: '3 oyga 150,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH12,
        debt_sum: 200000.0,
        debtor: debtor2_1,
        description: '12 oyga 200,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH3,
        debt_sum: 150000.0,
        debtor: debtor1_2,
        description: '3 oyga 150,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH12,
        debt_sum: 200000.0,
        debtor: debtor1_2,
        description: '12 oyga 200,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH3,
        debt_sum: 150000.0,
        debtor: debtor2_2,
        description: '3 oyga 150,000 so‘m qarz',
      }),
      this.debtRepo.create({
        debt_date: new Date(),
        debt_period: DebtPeriod.MONTH12,
        debt_sum: 200000.0,
        debtor: debtor2_2,
        description: '12 oyga 200,000 so‘m qarz',
      }),
    ];

    try {
      await Promise.all([
        this.adminRepo.save(superAdmin),
        this.adminRepo.save(admin),
        this.storeRepo.save(newStore1),
        this.storeRepo.save(newStore2),
        this.debtorRepo.save(debtor1_1),
        this.debtorRepo.save(debtor2_1),
        this.debtorRepo.save(debtor1_2),
        this.debtorRepo.save(debtor2_2),
        ...debts.map((debt) => this.debtRepo.save(debt)),
      ]);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return 'Setup completed';
  }
}
