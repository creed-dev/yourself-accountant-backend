import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.debts)
  user: User;

  @Column('text')
  name: string;

  @Column({
    type: 'integer',
    unsigned: true,
  })
  amount: number;

  @Column('integer')
  type: number;

  @Column({
    type: 'date',
  })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
