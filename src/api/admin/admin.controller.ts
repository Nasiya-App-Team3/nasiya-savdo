import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './dto/index.js';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, description: 'The admin created successfuly!' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post()
  create(@Body() adminData: CreateAdminDto) {
    return this.adminService.create(adminData);
  }

  @ApiOperation({ summary: 'Get"s all admins' })
  @ApiResponse({ status: 200, description: 'List of all admins:' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get"s admin by id' })
  @ApiResponse({ status: 200, description: 'The admin"s data:' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update admin"s data' })
  @ApiResponse({ status: 200, description: 'The admin successfully updated!' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateAdminDto) {
    return this.adminService.update(id, updateData);
  }

  @ApiOperation({ summary: 'Delete"s an admin' })
  @ApiResponse({ status: 200, description: 'The admin successfully deleted!' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
