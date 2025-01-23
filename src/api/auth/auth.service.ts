import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { StoreService } from '../store/store.service';
import { BcryptManage } from '../../infrastructure/lib/bcrypt/index';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from '../../common/interfaces/index';
import { config } from '../../config/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private readonly bcryptManage: BcryptManage,
    private readonly jwtService: JwtService,
  ) {}
  async login(authLoginDto: AuthLoginDto) {
    const currentStore = await this.storeService.findByLogin(
      authLoginDto.login,
    );
    if (!currentStore) {
      throw new BadRequestException('login or password not found!');
    }
    const isMatch = await this.bcryptManage.comparePassword(
      authLoginDto.hashed_password,
      currentStore.hashed_password,
    );
    if (!isMatch) {
      throw new BadRequestException('login or password not found!');
    }
    if (!currentStore.is_active) {
      throw new ForbiddenException(`You are inactive. Call the admin`);
    }
    const payload: IPayload = {
      sub: currentStore.id,
      login: currentStore.login,
      is_active: currentStore.is_active,
    };
    const accessToken = await this.jwtService.sign(payload, {
      secret: config.ACCESS_TOKEN_KEY,
      expiresIn: config.ACCESS_TOKEN_TIME,
    });
    const refreshToken = await this.jwtService.sign(payload, {
      secret: config.REFRESH_TOKEN_KEY,
      expiresIn: config.REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
