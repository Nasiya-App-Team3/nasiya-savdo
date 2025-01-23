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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './dto';

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
    const data = await this.adminService.findAll();
    return {
      status_code: HttpStatus.OK,
      message: 'success',
      data,
    };
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
}
