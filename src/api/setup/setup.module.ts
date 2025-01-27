import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { Admin, Debtor, Debt, Store } from 'src/core/entity';
import { BcryptManage } from 'src/infrastructure/lib/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Debt, Debtor, Store])],
  controllers: [SetupController],
  providers: [SetupService, BcryptManage],
})
export class SetupModule {}
