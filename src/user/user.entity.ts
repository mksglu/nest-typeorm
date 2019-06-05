import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
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

  // @ManyToMany(type => Role, role=>role.id,{cascade:true})
  // @JoinTable()
  // roles: Role[];

  @ManyToOne(type=>Role,role=>role.id,{cascade:true})
  role:Role;
}
