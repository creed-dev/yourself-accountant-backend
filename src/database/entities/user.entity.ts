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

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
