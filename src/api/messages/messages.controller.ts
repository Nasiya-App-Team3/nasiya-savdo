import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { UpdatePaymentDto } from '../payment/dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Api')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Create Payment',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created Payment',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {
          sum: 500,
          type: 'one_month',
          id: 'f17c8dab-0058-4202-91d1-77ebf989ecd1',
          created_at: '2025-01-24T09:25:43.175Z',
          updated_at: '2025-01-24T09:25:43.175Z',
          date: '2025-01-24',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to Validate UUID',
    schema: {
      example: {
        message: ['debtId must be a UUID'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to Validation',
    schema: {
      example: {
        message:
          'Unexpected token \',\', ..."   "sum": ,\n    "typ"... is not valid JSON',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({
    summary: 'Find All Payment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find All Payment',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: [
          {
            id: '7864999c-50fc-45ef-b7cb-cc6138544ed5',
            created_at: '2025-01-23T19:46:26.009Z',
            updated_at: '2025-01-23T19:46:26.009Z',
            sum: '300.00',
            date: '2025-01-23',
            type: 'one_month',
          },
          {
            id: 'de04020e-6300-4be6-a0d1-9aa886d447cc',
            created_at: '2025-01-23T19:48:11.113Z',
            updated_at: '2025-01-23T19:48:11.113Z',
            sum: '300.00',
            date: '2025-01-23',
            type: 'one_month',
          },
        ],
      },
    },
  })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({
    summary: 'Find One Payment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find One Payment',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 'f17c8dab-0058-4202-91d1-77ebf989ecd1',
          created_at: '2025-01-24T09:25:43.175Z',
          updated_at: '2025-01-24T09:25:43.175Z',
          sum: '500.00',
          date: '2025-01-24',
          type: 'one_month',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to Validate UUID',
    schema: {
      example: {
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Patch One Payment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Patch One Payment',
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
    description: 'Failed to Validate UUID',
    schema: {
      example: {
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @ApiOperation({
    summary: 'Delete One Payment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete One Payment',
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
    description: 'Failed to Validate UUID',
    schema: {
      example: {
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found Payment',
    schema: {
      example: {
        statusCode: 404,
        message: 'not found',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.delete(id);
  }
}
