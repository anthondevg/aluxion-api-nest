import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { S3Service } from 'src/aws/s3/s3.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(
    private unsplashService: UnsplashService,
    private readonly s3Service: S3Service,
  ) {}

  @Get(':query')
  search(@Param('query') query: string) {
    return this.unsplashService.searchImages(query);
  }

  @Post('download-and-upload-to-s3')
  async downloadAndUpload(
    @Body('url') url: string,
    @Body('filename') filename: string,
  ): Promise<any> {
    const imageBuffer = await this.unsplashService.downloadImage(url);
    const res = await this.s3Service.uploadImageFromBuffer(
      imageBuffer,
      filename,
    );
    return {
      message: `Image downloaded and saved in Bucket.`,
      res: res,
    };
  }
}
