import { Entity, Column, PrimaryGeneratedColumn, Exclusion, OneToMany } from 'typeorm'
import { Article } from './article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  email: string;

  @Column({ unique: true})
  userName: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true})
  isActive: boolean;

  // @OneToMany(() => Article, (article) => article.user, { nullable: true })
  // articles: Article[];
}