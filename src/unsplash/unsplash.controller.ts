import { Controller, Get, Param } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(private unsplashService: UnsplashService) {}

  @Get(':query')
  search(@Param('query') query: string) {
    return this.unsplashService.searchImages(query);
  }
}
