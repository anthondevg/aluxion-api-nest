import { Controller, Post, Body, Param } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
// import { Resend } from 'resend';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post()
  async requestReset(@Body('email') email: string): Promise<any> {
    const token = await this.passwordResetService.generateResetToken(email);

    // Send email using SMTP service like resend, for testing porpuses we are going to use just the token in our api.
    // const resend = new Resend('key');

    // resend.emails.send({
    //   from: 'aluxion@resend.dev',
    //   to: [email],
    //   subject: 'Hello, please use this link to reset your password',
    //   html: `Hello from Aluxion, I am Anthony! <br/ > please use this link to reset your password <p><a href='http://localhost:3000/reset-password/${email}/${token}'></a></p>`,
    // });

    return {
      message: `Hello ${email} In a real app you need to check your email but in this case we are going just to use the token to reset your password: ${token}`,
    };
  }

  @Post('/:email/:token')
  async resetPassword(
    @Param('email') email: string,
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<string> {
    await this.passwordResetService.resetPassword(email, token, newPassword);
    return 'password resetted succesfully';
  }
}
