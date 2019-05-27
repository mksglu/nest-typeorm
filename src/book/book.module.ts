import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { User } from '../user/user.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
