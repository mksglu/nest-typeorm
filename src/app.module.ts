import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "changeme",
    "database": "nest",
    "entities": [__dirname + "/**/*.entity{.ts,.js}"],
    "synchronize": true
  }),
  UsersModule,
  BookModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
