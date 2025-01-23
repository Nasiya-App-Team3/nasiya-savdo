import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from '../../core/repository/admin.repository';
import { Admin } from '../../core/entity/admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  create(adminData: Partial<Admin>): Promise<Admin> {
    return this.adminRepository.createAdmin(adminData);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.findAll();
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOneById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: string, updateData: Partial<Admin>): Promise<Admin> {
    return this.adminRepository.updateAdmin(id, updateData);
  }

  async delete(id: string): Promise<void> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return this.adminRepository.deleteAdmin(id);
  }
}
