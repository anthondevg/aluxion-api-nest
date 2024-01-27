import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { get } from 'src/utils/utils';

@Injectable()
export class UnsplashService {
  async searchImages(query: string) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    return await get(apiUrl);
  }

  async downloadImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  }
}
