import { Body, Controller, Post } from '@nestjs/common';

@Controller('login')
export class AuthController {
  @Post()
  login(@Body('email') email: string, @Body('password') password: string) {
    console.log('login');
  }
}
