import { Body, Controller, Delete, Get,Post, Put ,ParseIntPipe,Param, Query, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import {ApiBearerAuth} from '@nestjs/swagger'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post('post')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    postUser( @Body() book: CreateBookDto) {
        return this.booksService.insert(book);
    }

    @Get()
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    getAll() {
        return this.booksService.getAllBooks();
    }

    @Delete('delete/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    deleteBooks(@Param('id') bookID: number ) {
        return this.booksService.deleteBook(bookID)
    }

    @Put('update/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    updateBook(@Param('id') bookID: number, @Body() createBookDto: CreateBookDto){
        return this.booksService.updateBook(bookID,createBookDto)
    }
}
