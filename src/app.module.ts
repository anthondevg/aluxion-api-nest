import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UsersModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
