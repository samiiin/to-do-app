import { Body, Controller, Delete, Get,Post, Put ,ParseIntPipe,Param, Query} from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery,ApiBody } from '@nestjs/swagger';
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

    @Delete('delete/:id')
    deleteBooks(@Param('id') bookID: number ) {
        return this.booksService.deleteBook(bookID)
    }

    @Put('update/:id')
    updateBook(@Param('id') bookID: number, @Body() createBookDto: CreateBookDto){
        return this.booksService.updateBook(bookID,createBookDto)
    }
}
