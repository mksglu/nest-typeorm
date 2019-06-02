import {
  Controller,
  Post,
  Body,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async loginUser(@Body() body: LoginDto) {
    const { email, password } = body;
    return await this.authService.login(email, password);
  }
}
