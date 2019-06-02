import {
  Controller,
  Post,
  Body,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
// import {Response} from 'express'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: Repository<User>,
    private readonly authService: Repository<any>,
  ) {
    console.log('auth controller');
  }

  @Post('login')
  async loginUser(@Response() res: Response, @Body() body: User) {
    if (!(body && body.email && body.password)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'unauthorize',
        },
        403,
      );
    }
    const { email } = body;
    const user = await this.usersService.findOne({ where: { email } });
    if(user) {

    }
  }
}
