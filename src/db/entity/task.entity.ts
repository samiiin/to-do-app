import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import CategoryEntity from './category.entity';
import ItemEntity from './item.entity';
import TagEntity from './tag.entity';
import UserEntity from './user.entity';

@Entity()
export default class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @OneToMany( type => ItemEntity , item => item.task,{eager:true,onDelete : 'CASCADE', onUpdate : 'CASCADE'})
  items: ItemEntity[];

  @ManyToOne(type => UserEntity , user=>user.tasks,{eager:true})
  user: UserEntity;

  @ManyToMany(type => TagEntity,{eager:true,onDelete : 'CASCADE', onUpdate : 'CASCADE'})
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(type=> CategoryEntity, category=>category.tasks,{eager:true})
  category: CategoryEntity;

}