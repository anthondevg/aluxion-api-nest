import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { get } from 'src/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UnsplashService {
  private apikey: string;

  constructor(private readonly configService: ConfigService) {
    this.apikey = this.configService.get<string>('uApiKey');
  }
  async searchImages(query: string) {
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${this.apikey}`;
    return await get(apiUrl);
  }

  async downloadImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  }
}
