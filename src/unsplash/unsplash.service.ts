import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UnsplashService {
  constructor(private readonly httpService: HttpService) {}

  async searchImages(query: string) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    const { data } = await firstValueFrom(
      this.httpService.get(apiUrl).pipe(
        catchError((error) => {
          throw `An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`;
        }),
      ),
    );

    return data;
  }
}
