import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IBook } from './interfaces/book.interfaces';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    console.log('book service called');
  }

  async createBook(Book: IBook) {
    const fakeId = 1;
    const user = await this.userRepository.findOne({ where: { id: fakeId } });
    const book = await this.bookRepository.create({ user, name: Book.name });
    return await this.bookRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['user'] });
  }
}
