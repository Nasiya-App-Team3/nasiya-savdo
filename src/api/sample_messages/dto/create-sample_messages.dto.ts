import { IsString } from 'class-validator';

export class CreateSampleMessagesDto {
  @IsString()
  sample: string;
  store?: string;
}
