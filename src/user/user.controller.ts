import { Body, Controller, Get, ParseIntPipe, Post, Put ,Query,Request,UseGuards} from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery,ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

//'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @Get()
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.usersServices.getAllUsers();
  }

  @ApiResponse({ status: 200})
  @ApiQuery(
  {     name :'userID',
        required: true,
        type: Number,
   })

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request 
  @Get('books')
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  getBooks(@Query('userID') userID: number) {
    return this.usersServices.getBooksOfUser(userID);
  }
}