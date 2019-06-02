import { User } from './user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { IUser } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private saltRounds = 10;
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
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async isDuplicateUser(email: string): Promise<boolean> {
    return Boolean(await this.findOne({ where: { email } }));
  }
  async createUser(User: IUser) {
    const isDuplicateUser = await this.isDuplicateUser(User.email);
    if (!isDuplicateUser) {
      const password = await this.hashPassword(User.password);
      const user = { ...User, password };
      const newUser = this.userRepository.create(user);
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
  async compareHash(password:string, hash:string):Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
