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
import { UpdateSampleMessagesDto } from './dto/update-sample_messages.dto';
import { AuthGuard } from '../../common/guard/jwt-auth.guard';
import { UserID } from 'src/common/decorator/user-id.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Sample Messages')
@ApiBearerAuth('access-token', { description: 'JWT authorization' })
@UseGuards(AuthGuard)
@Controller('sample/messages')
export class SampleMessagesController {
  constructor(private readonly sampleMessagesService: SampleMessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sample message' })
  @ApiCreatedResponse({
    description: 'The sample message has been successfully created.',
    type: CreateSampleMessagesDto,
  })
  create(
    @Body() createSampleMessagesDto: CreateSampleMessagesDto,
    @UserID() id: string,
  ) {
    return this.sampleMessagesService.create({
      ...createSampleMessagesDto,
      store: id,
    });
  }

  @ApiOperation({ summary: 'Get all sample messages' })
  @ApiOkResponse({
    description: 'List of all sample messages for the store.',
    type: [CreateSampleMessagesDto],
  })
  @Get()
  findAll(@UserID() id: string) {
    return this.sampleMessagesService.findAll({ where: { store: { id } } });
  }

  @ApiOperation({ summary: 'Get one sample message by ID' })
  @ApiNotFoundResponse({
    description: 'Sample message not found.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the sample message.',
    type: CreateSampleMessagesDto,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @UserID() store: string) {
    return this.sampleMessagesService.findOneById(id, {
      where: { store: { id: store } },
    });
  }

  @ApiOperation({ summary: 'Update one sample message by ID' })
  @ApiNotFoundResponse({
    description: 'Sample message with the given ID not found.',
  })
  @ApiOkResponse({
    description: 'Successfully updated the sample message.',
    type: UpdateSampleMessagesDto,
  })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSampleMessages: UpdateSampleMessagesDto,
  ) {
    return this.sampleMessagesService.update(id, updateSampleMessages);
  }

  @ApiOperation({ summary: 'Delete one sample message by ID' })
  @ApiNotFoundResponse({
    description: 'Sample message with the given ID not found.',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the sample message.',
  })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.sampleMessagesService.delete(id);
  }
}
