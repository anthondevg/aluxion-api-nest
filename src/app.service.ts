import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Aluxion! Welcome to my developed with ♥ by Anthony Gonzalez @anthondev';
  }
}
