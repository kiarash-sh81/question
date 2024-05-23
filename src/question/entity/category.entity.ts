import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  title: string;
}
