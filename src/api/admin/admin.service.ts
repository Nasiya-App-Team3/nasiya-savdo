import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../core/repository/admin.repository';
import { Admin } from '../../core/entity/admin.entity';
import { CreateAdminDto } from './dto';
import { DeepPartial } from 'typeorm';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService extends BaseService<CreateAdminDto, DeepPartial<Admin>> {
  constructor(@InjectRepository(Admin) repository: AdminRepository) {
    super(repository);
  }
}
