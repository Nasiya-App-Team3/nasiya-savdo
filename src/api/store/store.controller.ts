import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStoresDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { UpdateStoresDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storesService: StoreService) {}
  @Post()
  create(@Body() cerateStoresDto: CreateStoresDto) {
    return this.storesService.create(cerateStoresDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.findOne(id);
  }
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStoreDto: UpdateStoresDto) {
    return this.storesService.update(id, updateStoreDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.remove(id);
  }
}
