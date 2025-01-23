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

@UseGuards(AuthGuard)
@Controller('debtor')
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}
  @Post()
  create(@Body() createDebtorDto: CreateDebtorDto, @UserID() id: string) {
    return this.debtorService.create({ ...createDebtorDto, store: id });
  }

  @Get()
  findAll(@UserID() id: any) {
    return this.debtorService.findAll({
      where: { store: { id } },
    });
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.debtorService.findOneById(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDebtorDto: UpdateDebtorDto,
  ) {
    return this.debtorService.update(id, updateDebtorDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.debtorService.delete(id);
  }
}
