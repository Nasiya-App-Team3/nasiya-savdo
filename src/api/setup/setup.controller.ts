import { Controller, Post } from '@nestjs/common';
import { SetupService } from './setup.service';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupServiec: SetupService) {}
  @Public()
  @Post()
  setup() {
    return this.setupServiec.setup();
  }
}
