import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export default class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;
}
