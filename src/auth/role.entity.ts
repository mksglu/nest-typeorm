import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * admin: 0
 * editor: 1
 *
 *
 * user: [{
 * name: "Mert",
 * book: [{}],
 * role: {
 *     id 1,
 *  name admin/editor
 * }
 * }]
 * bir role'un birden fazla user'i olabilir,
 * bir user'in bir tane role'u olabilir
 * oneToMany
 * belongsTo
 */

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => User, user => user.role) // specify inverse side as a second parameter
  user: User;
}
