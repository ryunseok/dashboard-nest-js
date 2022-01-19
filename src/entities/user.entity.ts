import { Entity, Column, PrimaryGeneratedColumn, Exclusion, OneToMany } from 'typeorm'

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
}