import { User } from './user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { IUser } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    console.log('user service called');
  }

  async getAllUsers(): Promise<User[]> {
    console.log('get all users');
    return await this.userRepository.find({ relations: ['books'] });
  }
  async findOne(findOptions?: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(findOptions);
  }

  async isDuplicateUser(email: string): Promise<boolean> {
    return Boolean(await this.findOne({ where: { email } }));
  }

  async createUser(payload: IUser) {
    const isDuplicateUser = await this.isDuplicateUser(payload.email);
    if (!isDuplicateUser) {
      const newUser = this.userRepository.create(payload);
      await this.userRepository.save(newUser);
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
