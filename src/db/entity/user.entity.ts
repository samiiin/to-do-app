import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,Unique} from 'typeorm';
import BookEntity from './book.entity';
import TaskEntity from './task.entity'

@Entity()
export default class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length : 40})
  password: string;

  // 1:n relation with bookEntity 
  @OneToMany( type => BookEntity , book => book.user)
  books: BookEntity[];

  @OneToMany( type => TaskEntity , task => task.user)
  tasks: TaskEntity[];

}
