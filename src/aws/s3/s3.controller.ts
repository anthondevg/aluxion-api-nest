import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('file')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET;
    const fileUrl = await this.s3Service.upload(file, bucketName);
    return fileUrl;
  }

  // download
  @Get(':filename')
  async downloadFile(@Param('filename') fileName: string): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET;
    const fileUrl = await this.s3Service.getFileUrl(fileName, bucketName);
    return fileUrl;
  }
  // files
  @Get('')
  async list(): Promise<AWS.S3.ObjectList> {
    const bucketName = process.env.AWS_S3_BUCKET;
    return this.s3Service.listObjects(bucketName);
  }
}
