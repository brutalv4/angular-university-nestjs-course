import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('login')
export class AuthController {
  constructor(
    @InjectModel('User')
    private userDb: Model<{
      email: string;
      roles: string[];
      passwordHash: string;
    }>,
  ) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userDb
      .findOne({ email })
      .orFail(new UnauthorizedException('User does not exist'));

    console.log(user);
  }
}
