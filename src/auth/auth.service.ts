import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(userData: User): Promise<User> {
    return await this.usersService.findOne({
      where: { email: userData.email },
    });
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
