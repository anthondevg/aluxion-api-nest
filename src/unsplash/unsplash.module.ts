import { Module } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { UnsplashController } from './unsplash.controller';
import { HttpModule } from '@nestjs/axios';
import { S3Service } from 'src/aws/s3/s3.service';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [UnsplashService, S3Service],
  controllers: [UnsplashController],
})
export class UnsplashModule {}
