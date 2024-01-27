import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('AWS S3 Bucket')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  // list files
  @Get('')
  @ApiOperation({
    summary: 'Get all files from s3',
  })
  async list(): Promise<AWS.S3.ObjectList> {
    return this.s3Service.listObjects();
  }
  // rename file
  @Post('rename')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldKey: { type: 'string', example: 'bucketKey.png' },
        newKey: { type: 'string', example: 'newKeyFortheobject.png' },
      },
      required: ['oldKey', 'newKey'],
    },
  })
  @ApiOperation({
    summary: 'Rename a file with a new name in S3 Bucket',
  })
  async renameObject(@Body() body: { oldKey: string; newKey: string }) {
    const { oldKey, newKey } = body;
    return await this.s3Service.renameObject(oldKey, newKey);
  }

  // upload file
  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to be uploaded',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const fileUrl = await this.s3Service.upload(file);
    return fileUrl;
  }

  // download
  @Get(':filename')
  @ApiOperation({
    summary: 'get download file URL from s3',
  })
  async downloadFile(@Param('filename') fileName: string): Promise<string> {
    const fileUrl = await this.s3Service.generateDownloadUrl(fileName);
    return fileUrl;
  }

  // delete - Note: Access Denied Aluxion's IAM User don't have permissions to delete
  @Delete(':objectKey')
  @ApiOperation({
    summary: 'delete file',
  })
  async deleteObject(
    @Param('objectKey') objectKey: string,
  ): Promise<AWS.S3.DeleteObjectOutput> {
    return await this.s3Service.deleteObject(objectKey);
  }
}
