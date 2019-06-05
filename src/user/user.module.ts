import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserSubscriber } from './user.subscriber';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [passportModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService,UserSubscriber],
  exports: [passportModule],
})
export class UsersModule {}
