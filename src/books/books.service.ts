import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[] > {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }

  async deleteBook(bookID: number): Promise<String>{
    try{
      const book: BookEntity = await BookEntity.findOne({where: {id: bookID}});
      await BookEntity.remove(book)
      return `Book ${bookID} deleted!`;
    }
    catch(error){
      console.log(error)
      return "Record can not found!"
    } 
  }

  async updateBook(bookID: number,bookDetails: CreateBookDto): Promise<String>{
    try{
      const selectedBook: BookEntity = await BookEntity.findOne({where: {id: bookID}});
      if(bookDetails.name)
        selectedBook.name = bookDetails.name

      if(bookDetails.userID){
          const user : UserEntity = await UserEntity.findOne({where: {id: bookDetails.userID}})
          selectedBook.user = user
      }
      
      if(bookDetails.genreIDs){
        selectedBook.genres=[];
        for ( let i = 0; i < bookDetails.genreIDs.length ; i++){
             const genre = await GenreEntity.findOne(bookDetails.genreIDs[i]);
             selectedBook.genres.push(genre);
        }     
      } 

      await selectedBook.save();
      return `Book ${bookID} updated!`
    }
    catch(error){
      return "An error accured while updating!"
    }
  }
}