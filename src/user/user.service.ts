import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interfaces';

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

  async createUser(User: IUser) {
    await this.userRepository.save(User);
    // console.log('createUser',User);
  }
}
