import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
