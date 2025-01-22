import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../core/entity/admin.entity';
import { AdminRepository } from '../../core/repository/admin.repository';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
})
export class AdminModule {}
