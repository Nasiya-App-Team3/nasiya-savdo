import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/common/decorator/cookie-getter.decorator';
import { AuthGuard } from 'src/common/guard/jwt-auth.guard';

class TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@ApiTags('Auth')
@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {}
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login or password not found!',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You are inactive. Call the admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful login',
    type: TokenResponse,
  })
  @Post('login')
  login(
    @Body() authLoginDto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(authLoginDto, res);
  }

  @ApiOperation({ summary: 'New access token for admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access token success',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjRkMGJ',
          expire: '24h',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fail new access token',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on refresh token',
      },
    },
  })
  @Post('refresh-token')
  refreshToken(@CookieGetter('refresh_token_store') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }

  @ApiOperation({ summary: 'Logout admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin logged out success',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fail on logging out admin',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on logout',
      },
    },
  })
  @UseGuards(AuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  logout(
    @CookieGetter('refresh_token_store') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refresh_token, res);
  }
}
