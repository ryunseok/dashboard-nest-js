import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column({ default: true})
  isActive: boolean;
}