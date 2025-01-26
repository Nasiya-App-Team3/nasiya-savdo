import { Controller, Post } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupServiec: SetupService) {}
  @Post()
  setup() {
    return this.setupServiec.setup();
  }
}
