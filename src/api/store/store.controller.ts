import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStoresDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { UpdateStoresDto } from './dto/update-store.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Store API')
@Controller('store')
export class StoreController {
  constructor(private readonly storesService: StoreService) {}

  @ApiOperation({
    summary: 'Create Store',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created store',
    schema: {
      example: {
        login: 'Ali',
        pin_code: 510,
        phone_number: '+998121234577',
        email: 'asd@asd.com',
        id: '99cbf11a-352c-46d8-9862-d66d7e0edb8d',
        created_at: '2025-01-23T14:53:14.185Z',
        updated_at: '2025-01-23T14:53:14.185Z',
        wallet: '0.00',
        image: '',
        is_active: true,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to create store',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation error',
      },
    },
  })
  @Post()
  create(@Body() cerateStoresDto: CreateStoresDto) {
    return this.storesService.create(cerateStoresDto);
  }

  @ApiOperation({
    summary: 'Get All Store',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All store',
    schema: {
      example: [
        {
          login: 'Ali',
          pin_code: 510,
          phone_number: '+998121234577',
          email: 'asd@asd.com',
          id: '99cbf11a-352c-46d8-9862-d66d7e0edb8d',
          created_at: '2025-01-23T14:53:14.185Z',
          updated_at: '2025-01-23T14:53:14.185Z',
          wallet: '0.00',
          image: '',
          is_active: true,
        },
        {
          login: 'Ali',
          pin_code: 510,
          phone_number: '+998121234577',
          email: 'asd@asd.com',
          id: '99cbf11a-352c-46d8-9862-d66d7e0edb8d',
          created_at: '2025-01-23T14:53:14.185Z',
          updated_at: '2025-01-23T14:53:14.185Z',
          wallet: '0.00',
          image: '',
          is_active: true,
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Store not found',
    schema: {
      example: {
        message: 'Store is not found!',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @ApiOperation({
    summary: 'Get One Store',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get oen store',
    schema: {
      example: {
        login: 'Ali',
        pin_code: 510,
        phone_number: '+998121234577',
        email: 'asd@asd.com',
        id: '99cbf11a-352c-46d8-9862-d66d7e0edb8d',
        created_at: '2025-01-23T14:53:14.185Z',
        updated_at: '2025-01-23T14:53:14.185Z',
        wallet: '0.00',
        image: '',
        is_active: true,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Store not found',
    schema: {
      example: {
        message: 'Store is not found!',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update Store',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update store',
    schema: {
      example: {
        login: 'Ali',
        pin_code: 510,
        phone_number: '+998121234577',
        email: 'asd@asd.com',
        id: '99cbf11a-352c-46d8-9862-d66d7e0edb8d',
        created_at: '2025-01-23T14:53:14.185Z',
        updated_at: '2025-01-23T14:53:14.185Z',
        wallet: '0.00',
        image: '',
        is_active: true,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
    schema: {
      example: {
        message: ['Error....'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Store is not found',
    schema: {
      example: {
        message: 'Store is not found!',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStoreDto: UpdateStoresDto,
  ) {
    return this.storesService.update(id, updateStoreDto);
  }

  @ApiOperation({
    summary: 'Delete store',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Store not found',
    schema: {
      example: {
        message: 'Store is not found!',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Store Delete',
    schema: {
      example: {
        status: true,
        message: 'successfully deleted',
      },
    },
  })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.remove(id);
  }
}
