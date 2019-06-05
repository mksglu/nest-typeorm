import { User } from './user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IndexOptions } from 'typeorm';
import { IUser } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
// import { Role } from 'dist/auth/role.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    console.log('user service called');
  }

  async getAllUsers(): Promise<User[]> {
    console.log('get all users');
    return await this.userRepository.find({ relations: ['books'] });
  }
  async findOne(findOptions: any): Promise<User> {
    return this.userRepository.findOne(findOptions);
  }

  async isDuplicateUser(email: string): Promise<boolean> {
    return Boolean(await this.findOne({ where: { email } }));
  }

  async createUser(payload: IUser) {
    if (!(await this.isDuplicateUser(payload.email))) {
      const user = this.userRepository.create(payload);
      user.role = { role_name: 'editor', id: 2 }
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Sorry! This request is a duplicate user!',
        },
        403,
      );
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
