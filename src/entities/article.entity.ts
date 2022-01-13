import { Entity, Column, PrimaryGeneratedColumn, Exclusion } from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  passwordSalt: string;

  @Column({ default: true})
  isActive: boolean;
}