import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImageModule } from './image/image.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './aws/s3/s3.module';
import { UnsplashModule } from './unsplash/unsplash.module';

@Module({
  imports: [
    UsersModule,
    ImageModule,
    PrismaModule,
    AuthModule,
    S3Module,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
