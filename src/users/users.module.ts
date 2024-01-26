import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordResetService } from 'src/password-reset/password-reset.service';
import { PasswordResetController } from 'src/password-reset/password-reset.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, PasswordResetController],
  providers: [UsersService, PasswordResetService],
  exports: [UsersService],
})
export class UsersModule {}
