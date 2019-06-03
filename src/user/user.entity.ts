import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';
import { Book } from '../book/book.entity';
import { Role } from '../auth/role.entity';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = String(await bcrypt.hash(this.password, 10));
  }
  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(type => Book, book => book.user)
  books: Book[];

  @OneToOne(type => Role, role => role.id)
  @JoinColumn()
  role: Role
}
