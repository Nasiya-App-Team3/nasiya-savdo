import { PartialType } from '@nestjs/swagger';
import { CreateSampleMessagesDto } from './create-sample_messages.dto';

export class UpdateSampleMessages extends PartialType(
  CreateSampleMessagesDto,
) {}
