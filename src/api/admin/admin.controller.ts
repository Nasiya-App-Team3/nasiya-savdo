import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/common/decorator/cookie-getter.decorator';
import { TokenResponse } from 'src/common/interfaces';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'The admin was created successfully!',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {
          id: 'uuid',
          username: 'admin007',
          hashed_password: '$2b$10$hashedpassword',
          phone_number: '+998 90 123 45 67',
          role: 'ADMIN',
          created_at: '2023-01-01T00:00:00.000Z',
          updated_at: '2023-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post()
  async create(@Body() adminData: CreateAdminDto): Promise<any> {
    try {
      const data = await this.adminService.create(adminData);
      return {
        status_code: HttpStatus.CREATED,
        message: 'success',
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create admin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of all admins',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            username: 'admin007',
            hashed_password: '$2b$10$hashedpassword',
            phone_number: '+998 90 123 45 67',
            role: 'ADMIN',
            created_at: '2023-01-01T00:00:00.000Z',
            updated_at: '2023-01-01T00:00:00.000Z',
          },
        ],
      },
    },
  })
  @Get()
  async findAll(): Promise<any> {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'The admin data',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 'uuid',
          username: 'admin007',
          hashed_password: '$2b$10$hashedpassword',
          phone_number: '+998 90 123 45 67',
          role: 'ADMIN',
          created_at: '2023-01-01T00:00:00.000Z',
          updated_at: '2023-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const data = await this.adminService.findOneById(id);
    if (!data) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data,
    };
  }

  @ApiOperation({ summary: 'Update admin data' })
  @ApiResponse({
    status: 200,
    description: 'The admin was successfully updated',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 'uuid',
          username: 'updatedAdmin',
          hashed_password: '$2b$10$hashedpassword',
          phone_number: '+998 90 123 45 67',
          role: 'ADMIN',
          created_at: '2023-01-01T00:00:00.000Z',
          updated_at: '2023-01-02T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UpdateAdminDto,
  ): Promise<any> {
    const data = await this.adminService.update(id, updateData);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data,
    };
  }

  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({
    status: 200,
    description: 'The admin was successfully deleted',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: null,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    await this.adminService.delete(id);
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data: null,
    };
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login or password not found!',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You are inactive. Call the store',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful login',
    type: TokenResponse,
  })
  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto, @Res() res: Response) {
    return this.adminService.login(loginAdminDto, res);
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
    return this.adminService.refreshToken(refresh_token);
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
  // @UseGuards(AuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  logout(
    @CookieGetter('refresh_token_store') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refresh_token, res);
  }
}
