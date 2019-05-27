import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
import { BookModule } from './book/book.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, BookModule],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
