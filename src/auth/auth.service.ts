import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    private readonly usersService: Repository<User>,
  ) {}

  async createToken(id: number, username: string) {
    const expiresIn = 60 * 60;
    const secretOrKey = 'secret';
    const user = { username };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return { expires_in: expiresIn, token };
  }

  async validateUser(signedUser: User): Promise<boolean> {
    if (signedUser && signedUser.email) {
      const { email } = signedUser;
      return Boolean(this.usersService.findOne({ email }));
    }
  }
}
