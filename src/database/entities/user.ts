import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Debt } from './debt';

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

  @OneToMany(() => Debt, (debt) => debt.user)
  debts: Debt[];
}
