import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './dto/index.js';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create"s a new admin' })
  @ApiResponse({ status: 201, description: 'The admin created successfuly!' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post()
  create(@Body() adminData: CreateAdminDto) {
    return this.adminService.create(adminData);
  }

  @ApiOperation({ summary: 'Get"s all admins' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 200, description: 'List of all admins:' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get"s admin by id' })
  @ApiResponse({ status: 200, description: 'The admin"s data:' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update admin"s data' })
  @ApiResponse({ status: 200, description: 'The admin successfully updated!' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete"s an admin' })
  @ApiResponse({ status: 200, description: 'The admin successfully deleted!' })
  @ApiResponse({ status: 404, description: 'Admin is not found' })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.delete(id);
  }
}
