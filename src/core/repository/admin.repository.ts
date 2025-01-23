import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entity/admin.entity';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async createAdmin(adminData: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepo.create(adminData);
    return this.adminRepo.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  async findOneById(id: string): Promise<Admin> {
    return this.adminRepo.findOneBy({ id });
  }

  async updateAdmin(id: string, updateData: Partial<Admin>): Promise<Admin> {
    await this.adminRepo.update(id, updateData);
    return this.findOneById(id);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepo.delete(id);
  }
}
