import { User } from './user.entity';
import { UsersService } from './user.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import {createUserDto} from './dto/create-user.dto'
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Post('/')
  createUser(@Body() User: createUserDto) {
    this.userService.createUser(User);
  }
}
