import { ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.find({
      relations: ['role'],
      where: { id: request.user.id },
    });
    const hasRole = () => user.some((role) => roles.includes(role.role.role_name));
    return request.user && user && hasRole() ? super.canActivate(context) : false;
  }
}
