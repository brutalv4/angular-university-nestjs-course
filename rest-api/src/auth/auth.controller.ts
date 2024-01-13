import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as hashAndSalt from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';

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
    @Body('password') plainTextPassword: string,
  ) {
    const user = await this.userDb
      .findOne({ email })
      .orFail(new UnauthorizedException('User does not exist'));

    return new Promise((resolve, reject) => {
      hashAndSalt(plainTextPassword).verifyAgainst(
        user.passwordHash,
        (err, ok) => {
          if (!ok) reject(new UnauthorizedException());

          const authJwtToken = jwt.sign(
            { email, roles: user.roles },
            process.env.JWT_SECRET,
          );

          resolve({ authJwtToken });
        },
      );
    });
  }
}
