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
        status_code: 200,
        message: 'success',
        data: {
          login: 'Asadbek3',
          full_name: 'Asadbek Zaynobiddinov',
          email: 'asdbs@asd.com',
          phone_number: '+998121234578',
          pin_code: 510,
          id: '42c77dbc-8651-487c-99c7-4756364b7762',
          created_at: '2025-01-25T14:19:39.750Z',
          updated_at: '2025-01-25T14:19:39.750Z',
          wallet: '0.00',
          image: '',
          is_active: true,
        },
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to create store',
    schema: {
      example: {
        status_code: 400,
        error: {
          message: 'login already exist!',
        },
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
      example: {
        status_code: 200,
        message: 'success',
        data: [
          {
            id: '6b8413ab-84ad-4aa2-950f-09bb38cbc676',
            created_at: '2025-01-25T13:36:03.045Z',
            updated_at: '2025-01-25T13:36:03.045Z',
            login: 'Asadbek',
            wallet: '0.00',
            image: '',
            pin_code: 510,
            is_active: true,
          },
          {
            id: '42c77dbc-8651-487c-99c7-4756364b7762',
            created_at: '2025-01-25T14:19:39.750Z',
            updated_at: '2025-01-25T14:19:39.750Z',
            login: 'Asadbek3',
            wallet: '0.00',
            image: '',
            pin_code: 510,
            is_active: true,
          },
        ],
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
        status_code: 200,
        message: 'success',
        data: {
          id: '42c77dbc-8651-487c-99c7-4756364b7762',
          created_at: '2025-01-25T14:19:39.750Z',
          updated_at: '2025-01-25T14:22:58.559Z',
          login: 'Asadbek3',
          phone_number: '+998991234567',
          wallet: '0.00',
          image: '',
          pin_code: 510,
          is_active: true,
        },
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
        status_code: 200,
        message: 'success',
        data: {
          id: '42c77dbc-8651-487c-99c7-4756364b7762',
          created_at: '2025-01-25T14:19:39.750Z',
          updated_at: '2025-01-25T14:26:05.447Z',
          login: 'Asadbek3',
          phone_number: '+998991234567',
          wallet: '0.00',
          image: '',
          pin_code: 510,
          is_active: true,
        },
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
