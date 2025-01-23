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
  async create(
    cerateStoreDto: CreateStoresDto,
  ): Promise<Omit<Store, 'hashed_password'>> {
    const storeLogin = await this.repository.findOne({
      where: { login: cerateStoreDto.login },
    });
    if (storeLogin) {
      throw new BadRequestException('login already exist!');
    }
    const hashPassword = await this.manageBcrypt.createBcryptPassword(
      cerateStoreDto.hashed_password,
    );
    cerateStoreDto.hashed_password = hashPassword;
    const { hashed_password, ...newStore } =
      await this.repository.save(cerateStoreDto);
    return newStore;
  }

  async findAll(): Promise<Store[]> {
    const allStore = await this.repository.find({
      select: {
        id: true,
        login: true,
        wallet: true,
        image: true,
        pin_code: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (allStore.length === 0) {
      throw new NotFoundException('Store is not found!');
    }
    return allStore;
  }

  async findOne(id: string): Promise<Store> {
    const findOneStore = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        login: true,
        wallet: true,
        image: true,
        pin_code: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!findOneStore) {
      throw new NotFoundException('Store is not found!');
    }
    return findOneStore;
  }

  async update(id: string, updateStoreDto: UpdateStoresDto): Promise<Store> {
    await this.findOne(id);
    await this.repository.update(id, updateStoreDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const storeData = await this.findOne(id);
    if (!storeData) {
      throw new NotFoundException('Store is not found!');
    }
    const deleteStore = await this.repository.delete({ id });
    if (deleteStore.affected == 1) {
      return { status: true, message: 'successfully deleted' };
    } else {
      return { status: false, message: 'an error occurred during shutdown' };
    }
  }
}
