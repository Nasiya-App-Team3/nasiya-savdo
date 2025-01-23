import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/core/entity';
import { BcryptManage } from '../../infrastructure/lib/bcrypt/index';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [StoreService, BcryptManage],
  exports: [StoreService],
})
export class StoreModule {}
