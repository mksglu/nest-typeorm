import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

// import {UsersModule} from './user/user.module';
// import { UsersService } from './user/user.service';
// import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
