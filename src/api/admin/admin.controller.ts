import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { AuthGuard } from '../../common/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Admins')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed.',
  })
  @ApiCreatedResponse({
    description: 'The admin has been successfully created.',
    type: CreateAdminDto,
  })
  async create(@Body() adminData: CreateAdminDto): Promise<any> {
    try {
      return this.adminService.create(adminData);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create admin.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiOkResponse({
    description: 'List of all admins.',
    type: [CreateAdminDto],
  })
  async findAll(): Promise<any> {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiOkResponse({
    description: 'Return the admin data.',
    type: CreateAdminDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const data = await this.adminService.findOneById(id);
    if (!data) {
      throw new HttpException('Admin not found.', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admin data' })
  @ApiOkResponse({
    description: 'The admin has been successfully updated.',
    type: UpdateAdminDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UpdateAdminDto,
  ): Promise<any> {
    return this.adminService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiOkResponse({
    description: 'The admin has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    await this.adminService.delete(id);
    return { message: 'Admin successfully deleted.' };
  }
}
