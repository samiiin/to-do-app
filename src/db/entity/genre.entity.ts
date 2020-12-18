import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export default class GenreEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // n:n relation with genre
  @ManyToMany(type => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];

}