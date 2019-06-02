import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string): Promise<User> {
    return await this.usersService.findOne({
      where: { email },
    });
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validate(email);
    if (user) {
      const compareHash = await this.usersService.compareHash(
        password,
        user.password,
      );
      if (Boolean(compareHash)) {
        return await this.createToken(user.id, user.email);
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'The user not exist!',
        },
        404,
      );
    }
  }

  async createToken(id: number, username: string) {
    const payload = `${id}${username}`;
    const accessToken = this.jwtService.sign(payload);

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: id,
    };
  }
}
