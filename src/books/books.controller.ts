import { Body, Controller, Get,Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post('post')
    postUser( @Body() book: CreateBookDto) {
        return this.booksService.insert(book);
    }

    @Get()
    getAll() {
        return this.booksService.getAllBooks();
    }

}
