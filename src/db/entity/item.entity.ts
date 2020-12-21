import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import TaskEntity from './task.entity'
@Entity()
export default class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500})
  text: string;

  @ManyToOne(type => TaskEntity, task => task.items,{onDelete : 'CASCADE', onUpdate : 'CASCADE' })
  task : TaskEntity;

}