import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/')
  createBook(@Body() Book: createBookDto) {
    this.bookService.createBook(Book);
  }

  @Get('/')
  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }
}
