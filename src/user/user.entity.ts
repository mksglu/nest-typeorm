import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Book} from '../book/book.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type=> Book, book => book.user)
  books: Book[]
}
