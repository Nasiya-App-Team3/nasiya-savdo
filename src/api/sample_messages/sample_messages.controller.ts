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
import { SampleMessagesService } from './sample_messages.service';
import { CreateSampleMessagesDto } from './dto/create-sample_messages.dto';
import { UpdateSampleMessages } from './dto/update-sample_messages.dto';
import { AuthGuard } from '../../common/guard/jwt-auth.guard';
import { UserID } from 'src/common/decorator/user-id.decorator';

@UseGuards(AuthGuard)
@Controller('sample/messages')
export class SampleMessagesController {
  constructor(private readonly sampleMessagesService: SampleMessagesService) {}
  @Post()
  create(
    @Body() createSampleMessagesDto: CreateSampleMessagesDto,
    @UserID() id: string,
  ) {
    return this.sampleMessagesService.create({
      ...createSampleMessagesDto,
      store: id,
    });
  }

  @Get()
  findAll(@UserID() id: string) {
    return this.sampleMessagesService.findAll({ where: { store: { id } } });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @UserID() storeId: string) {
    return this.sampleMessagesService.findOneById(id, {
      where: { store: { id: storeId } },
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSampleMessages: UpdateSampleMessages,
  ) {
    return this.sampleMessagesService.update(id, updateSampleMessages);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.sampleMessagesService.delete(id);
  }
}
