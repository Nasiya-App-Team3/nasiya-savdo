import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoresDto } from './dto/create-store.dto';
import { Store } from '../../core/entity';
import { StoreRepository } from '../../core/repository/index';
import { BcryptManage } from '../../infrastructure/lib/bcrypt/index';
import { UpdateStoresDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly repository: StoreRepository,
    private readonly manageBcrypt: BcryptManage,
  ) {}
  async create(cerateStoreDto: CreateStoresDto): Promise<{
    status_code: number;
    message: string;
    data: Omit<Store, 'hashed_password'> | {};
  }> {
    const storeLogin = await this.repository.findOne({
      where: { login: cerateStoreDto.login },
    });
    const storeEmail = await this.repository.findOne({
      where: { email: cerateStoreDto.email },
    });
    const storePhone = await this.repository.findOne({
      where: { phone_number: cerateStoreDto.phone_number },
    });
    if (storeLogin) {
      throw new BadRequestException('login already exist!');
    } else if (storePhone) {
      throw new BadRequestException('Phone number already exist!');
    } else if (storeEmail) {
      throw new BadRequestException('Email already exist!');
    }
    const hashPassword = await this.manageBcrypt.createBcryptPassword(
      cerateStoreDto.hashed_password,
    );
    cerateStoreDto.hashed_password = hashPassword;
    let create_store = await this.repository.create(cerateStoreDto);
    const { hashed_password, ...newStore } =
      await this.repository.save(create_store);
    return {
      status_code: 200,
      message: 'success',
      data: newStore,
    };
  }

  async findStoreByDate(
    id: string,
    data: { start_date: Date; end_date: Date },
  ): Promise<{
    status_code: number;
    message: string;
    data: string;
  }> {
    if (!data?.start_date && !data?.end_date) {
      throw new Error('Date is required!');
    }

    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    const totalDebtSum = await this.repository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.debtors', 'debtor')
      .leftJoinAndSelect('debtor.debts', 'debt')
      .select('SUM(debt.debt_sum)', 'totalStoreDebt')
      .where('store.id = :id', { id })
      .andWhere('DATE(debt.next_payment_date) >= DATE(:startDate)', {
        startDate,
      })
      .andWhere('DATE(debt.next_payment_date) <= DATE(:endDate)', { endDate })
      .getRawOne();
    if (!totalDebtSum) {
      throw new NotFoundException('not found!');
    }
    return {
      status_code: 200,
      message: 'success',
      data: totalDebtSum,
    };
  }

  async findStoreByDateOne(
    id: string,
    datas: Date,
  ): Promise<{
    status_code: number;
    message: string;
    data: any;
  }> {
    if (!datas) {
      throw new Error('Date is required!');
    }

    const oneDate = new Date(datas);

    const totalDebtSum = await this.repository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.debtors', 'debtor')
      .leftJoinAndSelect('debtor.debts', 'debt')
      .select('debt.debt_sum, debtor.full_name', 'totalStoreDebt')
      .where('store.id = :id', { id })
      .andWhere('DATE(debt.next_payment_date) = DATE(:oneDate)', { oneDate })
      .getRawMany();

    if (totalDebtSum.length === 0) {
      throw new NotFoundException('not found!');
    }
    return {
      status_code: 200,
      message: 'success',
      data: totalDebtSum,
    };
  }

  async findAll(): Promise<{
    status_code: number;
    message: string;
    data: Store[];
  }> {
    const allStore = await this.repository.find({
      select: {
        id: true,
        login: true,
        wallet: true,
        image: true,
        phone_number: true,
        pin_code: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (allStore.length === 0) {
      throw new NotFoundException('Store is not found!');
    }
    return {
      status_code: 200,
      message: 'success',
      data: allStore,
    };
  }

  async findOne(id: string): Promise<{
    status_code: number;
    message: string;
    data: Store;
  }> {
    const findOneStore = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        login: true,
        wallet: true,
        image: true,
        phone_number: true,
        pin_code: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!findOneStore) {
      throw new NotFoundException('Store is not found!');
    }
    return {
      status_code: 200,
      message: 'success',
      data: findOneStore,
    };
  }

  async findByLogin(login: string): Promise<{
    status_code: number;
    message: string;
    data: Store;
  }> {
    const store = await this.repository.findOne({ where: { login } });
    if (!store) {
      throw new BadRequestException('login or password not found!');
    }
    return {
      status_code: 200,
      message: 'success',
      data: store,
    };
  }

  async update(
    id: string,
    updateStoreDto: UpdateStoresDto,
  ): Promise<{
    status_code: number;
    message: string;
    data: Store;
  }> {
    await this.findOne(id);
    await this.repository.update(id, updateStoreDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{
    status_code: number;
    message: string;
    data: {};
  }> {
    const storeData = await this.findOne(id);
    if (!storeData) {
      throw new NotFoundException('Store is not found!');
    }
    const deleteStore = await this.repository.delete({ id });
    if (deleteStore.affected == 1) {
      return {
        status_code: 200,
        message: 'successfully deleted',
        data: {},
      };
    } else {
      return {
        status_code: 200,
        message: 'an error occurred during shutdown',
        data: {},
      };
    }
  }

  // async query(query){}
}
