import { userInfo } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, Exclusion, OneToOne } from 'typeorm'
import { User } from './user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}