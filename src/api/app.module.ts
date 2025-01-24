import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/index';
import { DebtsModule } from './debts/debts.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { DebtorModule } from './debtor/debtor.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { LikesModule } from './likes/likes.module';
import { SampleMessagesModule } from './sample_messages/sample_messages.module';
import { MessagesModule } from './messages/messages.module';
import { PhoneNumbersModule } from './phone_numbers/phone_numbers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: +config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
    }),
    DebtsModule,
    StoreModule,
    AuthModule,
    DebtorModule,
    AdminModule,
    PaymentModule,
    LikesModule,
    SampleMessagesModule,
    MessagesModule,
    PhoneNumbersModule,
  ],
})
export class AppModule {}
