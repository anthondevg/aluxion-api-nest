import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { S3Service } from 'src/aws/s3/s3.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnsplashDto } from './dto/download-unsplash.dto';

@Controller('unsplash')
@ApiTags('Unsplash')
export class UnsplashController {
  constructor(
    private unsplashService: UnsplashService,
    private readonly s3Service: S3Service,
  ) {}

  @Get(':query')
  @ApiParam({
    name: 'query',
    description: 'search term unsplash',
    type: String,
  })
  @ApiOperation({
    summary: 'Perform a search on Unsplash API',
  })
  search(@Param('query') query: string) {
    return this.unsplashService.searchImages(query);
  }

  @Post('download-and-upload-to-s3')
  @ApiBody({
    type: UnsplashDto,
  })
  @ApiOperation({
    summary: 'Get image from unsplash and save it on S3',
  })
  @ApiResponse({
    status: 201,
    description: `{
    "message": "Image downloaded and saved in Bucket.",
    "res": {
      ...
    }
  }`,
  })
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
