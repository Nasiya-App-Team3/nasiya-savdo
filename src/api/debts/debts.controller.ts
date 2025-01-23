import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DebtDto } from './dto/createDebt-dto';
import { DebtsService } from './debts.service';
import { UpdateDebtDto } from './dto/updateDebt-dto';

@ApiTags('Debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @ApiOperation({ summary: 'Create a new debt' })
  @ApiResponse({ status: 201, description: 'Debt successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @Post()
  @ApiBody({ type: DebtDto })
  create(@Body() debtDto: DebtDto) {
    return this.debtsService.create(debtDto);
  }

  @ApiOperation({ summary: 'Retrieve all debts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all debts.',
  })
  @Get()
  findAll() {
    return this.debtsService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single debt by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the debt.' })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the debt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.debtsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a debt by ID' })
  @ApiResponse({ status: 200, description: 'Debt successfully updated.' })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the debt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateDebtDto })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStoreDto: UpdateDebtDto,
  ) {
    return this.debtsService.update(id, updateStoreDto);
  }

  @ApiOperation({ summary: 'Delete a debt by ID' })
  @ApiResponse({ status: 200, description: 'Debt successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the debt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.debtsService.delete(id);
  }
}
