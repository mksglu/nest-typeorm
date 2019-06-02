import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Book } from '../book/book.entity';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  private saltRounds = 10;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = String(await bcrypt.hash(this.password, this.saltRounds));
  }
  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(type => Book, book => book.user)
  books: Book[];
}
