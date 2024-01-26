import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('file')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  // rename file
  @Post('rename')
  async renameObject(@Body() body: { oldKey: string; newKey: string }) {
    const { oldKey, newKey } = body;
    return await this.s3Service.renameObject(oldKey, newKey);
  }

  // upload file
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const fileUrl = await this.s3Service.upload(file);
    return fileUrl;
  }

  // download
  @Get(':filename')
  async downloadFile(@Param('filename') fileName: string): Promise<string> {
    const fileUrl = await this.s3Service.generateDownloadUrl(fileName);
    return fileUrl;
  }

  // files
  @Get('')
  async list(): Promise<AWS.S3.ObjectList> {
    return this.s3Service.listObjects();
  }
}
