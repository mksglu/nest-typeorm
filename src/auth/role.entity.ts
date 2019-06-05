import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;
}
