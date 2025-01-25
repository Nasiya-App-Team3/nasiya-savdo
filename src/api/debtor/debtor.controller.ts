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
} from '@nestjs/common';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { AuthGuard } from '../../common/guard/jwt-auth.guard';
import { DebtorService } from './debtor.service';
import { UserID } from 'src/common/decorator/user-id.decorator';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Debtor')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('debtor')
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new debtor' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiCreatedResponse({
    description: 'The debtor has been successfully created.',
    type: CreateDebtorDto,
  })
  create(@Body() createDebtorDto: CreateDebtorDto, @UserID() id: string) {
    return this.debtorService.create({ ...createDebtorDto, store: id });
  }

  @Get()
  @ApiOperation({ summary: 'Get all debtors' })
  @ApiOkResponse({
    description: 'Return all debtors.',
    type: [CreateDebtorDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  findAll(@UserID() id: string) {
    return this.debtorService.findAll({
      where: { store: { id } },
      relations: ['phone_numbers'],
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a debtor by ID' })
  @ApiOkResponse({
    description: 'Return the debtor.',
    type: CreateDebtorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor not found.',
  })
  findOne(@Param('id', ParseUUIDPipe) DebtorId: string, @UserID() id: string) {
    return this.debtorService.findOneById(DebtorId, {
      where: { id: id },
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a debtor by ID' })
  @ApiOkResponse({
    description: 'The debtor has been successfully updated.',
    type: UpdateDebtorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor not found.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDebtorDto: UpdateDebtorDto,
  ) {
    return this.debtorService.update(id, updateDebtorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a debtor by ID' })
  @ApiOkResponse({
    description: 'The debtor has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor not found.',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.debtorService.delete(id);
  }
}
