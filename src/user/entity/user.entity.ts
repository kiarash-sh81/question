import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../types/user.types';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  First_name: string;

  @Column()
  Last_name: string;

  @Column()
  n_code: string;

  @Column()
  Role: RoleType;

  @Column()
  password: string;
}
