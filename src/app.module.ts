import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './aws/s3/s3.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ConfigService } from 'aws-sdk';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    S3Module,
    UnsplashModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
