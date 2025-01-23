import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
