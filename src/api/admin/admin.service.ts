import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { Admin } from 'src/core/entity/index';
import { AdminRepository } from 'src/core/repository/index';
import { CreateAdminDto } from './dto';

@Injectable()
export class AdminService extends BaseService<
  CreateAdminDto,
  DeepPartial<Admin>
> {
  constructor(@InjectRepository(Admin) repository: AdminRepository) {
    super(repository);
  }
}
