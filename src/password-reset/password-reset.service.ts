import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaService) {}

  async generateResetToken(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const token = require('crypto').randomBytes(64).toString('hex');
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getTime() + 30 * 60000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        expiryDate: expiryDate,
      },
    });

    return token;
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
        resetToken: token,
        expiryDate: { gte: new Date() },
      },
    });

    if (!user) {
      throw new HttpException(
        'Looks like you are using an invalid token.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        expiryDate: null,
      },
    });
  }
}
