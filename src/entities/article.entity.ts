import { Entity, Column, PrimaryGeneratedColumn, Exclusion, OneToOne, ManyToOne } from 'typeorm'
import { User } from './user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // @ManyToOne(() => User, (user) => user.articles, { onDelete: 'SET NULL'})
  // user: User;
}