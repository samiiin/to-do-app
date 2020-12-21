import { Injectable } from '@nestjs/common';
import TagEntity from '../db/entity/tag.entity'
import CreateTagDto from './dto/create-tag.dto'
import CategoryEntity from '../db/entity/category.entity'
import CreateCategoryDto from './dto/create-category.dto'
import CreateTaskDto from './dto/create-task.dto';
import TaskEntity from 'src/db/entity/task.entity';
import UserEntity from 'src/db/entity/user.entity';
import UpdateTaskDto from './dto/update-task.dto';
import UpdateItemDto from './dto/update-item.dto';
import CreateItemDto from './dto/create-item.dto';
import ItemEntity from '../db/entity/item.entity';
@Injectable()
export  class TodoService {

    async insertTag(tagDetails: CreateTagDto): Promise<TagEntity> {

        const tagEntity: TagEntity = TagEntity.create();
        const name: string = tagDetails.name;
    
        tagEntity.name = name;
        await TagEntity.save(tagEntity);
        return tagEntity;
    }
      
    async getAllTag(): Promise<TagEntity[]> {
        return await TagEntity.find();
    }

    async insertCategory(categoryDetails: CreateCategoryDto): Promise<CategoryEntity> {

        const categoryEntity: CategoryEntity = CategoryEntity.create();
        const name: string = categoryDetails.name;
    
        categoryEntity.name = name;
        await CategoryEntity.save(categoryEntity);
        return categoryEntity;
    }
      
    async getAllCategory(): Promise<CategoryEntity[]> {
        return await CategoryEntity.find();
    }

    async insertTask(taskDetails: CreateTaskDto) : Promise<any> {
        if(!taskDetails.title)
            return 'title should not be empty'
        if(!taskDetails.userID)
            return 'userId should not be empty'
        
        try{
            const task = new TaskEntity()
            task.title = taskDetails.title
            task.user = await UserEntity.findOne(taskDetails.userID)
            if(taskDetails.category)
                task.category = await CategoryEntity.findOne({where:{name:taskDetails.category}}) 
            if(taskDetails.tagIDs){
                task.tags=[];
                for ( let i = 0; i < taskDetails.tagIDs.length ; i++){
                    const tag = await TagEntity.findOne(taskDetails.tagIDs[i]);
                    task.tags.push(tag);
                } 
            }  
            await TaskEntity.save(task);
            return task 
        }
        catch(error){
            return 'user can not be found'
        }    
    }

    async deleteTask(taskID : number) : Promise<String> {
        console.log(taskID)
        try{
            const task: TaskEntity = await TaskEntity.findOne({where: {id: taskID}});
            await TaskEntity.remove(task)
            return `Task ${taskID} deleted!`;
          }
          catch(error){
            console.log(error)
            return "Record can not be found!"
          } 
    }

    async updateTask(taskID: number,taskDetails: UpdateTaskDto): Promise<any> {
        try{
            const selectedTask: TaskEntity = await TaskEntity.findOne({where: {id: taskID}});
            if(taskDetails.title)
                selectedTask.title = taskDetails.title
            if(taskDetails.category)
                selectedTask.category  = await CategoryEntity.findOne({where:{name:taskDetails.category}}) 
            if(taskDetails.tagIDs){
                selectedTask.tags=[];
                for ( let i = 0; i < taskDetails.tagIDs.length ; i++){
                    const tag = await TagEntity.findOne(taskDetails.tagIDs[i]);
                    selectedTask.tags.push(tag);
                }
            }
            await selectedTask.save()
            return selectedTask
        }
        catch(error){
            return "An error accured while updating!"
        }

    }

    async getTasksOfUser(userID: number) : Promise<TaskEntity[]>{
        const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['tasks']});
        return user.tasks;
    }


    async insertItem(itemDetails: CreateItemDto) : Promise<any> {
        if(!itemDetails.text)
            return 'text should not be empty'
        if(!itemDetails.taskID)
            return 'taskID should not be empty'

        try{
            const item = new ItemEntity()
            item.text = itemDetails.text
            item.task = await TaskEntity.findOne(itemDetails.taskID)
            await ItemEntity.save(item);
            return item 
        }
        catch(error){
            return 'task can not be found'
        }
    }

    async deleteItem(itemID : number) : Promise<String> {
        try{
            const item: ItemEntity = await ItemEntity.findOne({where: {id: itemID}});
            await ItemEntity.remove(item)
            return `Item ${itemID} deleted!`;
          }
          catch(error){
            return "Record can not be found!"
          } 
    }

    async updateItem(itemID: number,itemDetails: UpdateItemDto): Promise<any> {
        try{
            const selectedItem: ItemEntity = await ItemEntity.findOne({where: {id: itemID}});
            if(itemDetails.text)
                selectedItem.text = itemDetails.text
            await selectedItem.save()
            return selectedItem
        }
        catch(error){
            return "An error accured while updating!"
        }

    }

    async getItemsOfTask(taskID: number) : Promise<ItemEntity[]>{
        const task: TaskEntity = await TaskEntity.findOne({where: {id: taskID}, relations: ['items']});
        return task.items;
    }

}
