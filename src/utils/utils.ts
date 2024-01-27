import { firstValueFrom, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

async function get(url: string) {
  const http = new HttpService();
  const { data } = await firstValueFrom(
    http.get(url).pipe(
      catchError((error) => {
        throw `An error happened. Msg: ${JSON.stringify(
          error?.response?.data,
        )}`;
      }),
    ),
  );

  return data;
}

export { get };
