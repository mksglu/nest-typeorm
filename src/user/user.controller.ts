import { User } from './user.entity';
import { UsersService } from './user.service';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('/')
  createUser(@Body() payload: createUserDto) {
    return this.userService.createUser(payload);
  }
}
