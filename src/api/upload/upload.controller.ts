import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      path: `http://localhost:3000/static/${file.filename}`,
    }));
  }
}
