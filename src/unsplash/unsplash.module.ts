import { Module } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { UnsplashController } from './unsplash.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [UnsplashService],
  controllers: [UnsplashController],
})
export class UnsplashModule {}
