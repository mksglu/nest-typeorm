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
  async loginUser(@Response() res: Response, @Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.usersService.findOne({ where: { email } });

    if (user) {
      // TODO: Compare Hash
    }

    return res.json({});
  }
}
