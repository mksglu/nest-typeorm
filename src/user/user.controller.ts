import { User } from './user.entity';
import { UsersService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {

    constructor(private readonly userService : UsersService){}

    @Get('/')
    getAllUsers() : Promise<User[]> {
        return this.userService.getAllUsers();
    }
}

// GET /users/users