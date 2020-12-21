import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Body, Get, Post ,UseGuards,Delete,Put,Param} from '@nestjs/common';
import {ApiBearerAuth} from '@nestjs/swagger'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateTagDto from './dto/create-tag.dto'
import CreateCategoryDto from './dto/create-category.dto'
import CreateTaskDto from './dto/create-task.dto'
import UpdateTaskDto from './dto/update-task.dto'
import CreateItemDto from './dto/create-item.dto'
import UpdateItemDto from './dto/update-item.dto'
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('insertTag')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    postTag( @Body() tag: CreateTagDto) {
        return this.todoService.insertTag(tag);
    }
  
    @Get('tags')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    getAllTag() {
        return this.todoService.getAllTag();
    }

    @Post('insertCategory')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    postCategory( @Body() category: CreateCategoryDto) {
        return this.todoService.insertCategory(category);
    }
  
    @Get('categories')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    getAllCategory() {
        return this.todoService.getAllCategory();
    }

    @Post('insertTask')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    postTask( @Body() task: CreateTaskDto) {
        return this.todoService.insertTask(task);
    }

    @Delete('deleteTask/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    deleteTask(@Param('id') taskID: number ) {
        return this.todoService.deleteTask(taskID)
    }

    @Put('updateTask/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    updateTask(@Param('id') taskID: number, @Body() updateTaskDto: UpdateTaskDto){
        return this.todoService.updateTask(taskID,updateTaskDto)
    }

    @Get('tasks/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    getTasksOfUser(@Param('id') userID: number) {
      return this.todoService.getTasksOfUser(userID);
    }

    @Post('insertItem')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    postItem( @Body() item: CreateItemDto) {
        return this.todoService.insertItem(item);
    }

    @Delete('deleteItem/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    deleteItem(@Param('id') itemID: number ) {
        return this.todoService.deleteItem(itemID)
    }

    @Put('updateItem/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    updateItem(@Param('id') itemID: number, @Body() updateItemDto: UpdateItemDto){
        return this.todoService.updateItem(itemID,updateItemDto)
    }

    @Get('items/:id')
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    getItemsOfTask(@Param('id') taskID: number) {
      return this.todoService.getItemsOfTask(taskID);
    }






}
