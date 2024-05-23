import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { OptionsType } from '../types/option.types';

@Entity('Question')
export class QuestionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  question: string;

  @Column({ type: 'jsonb' })
  options: OptionsType;

  @Column()
  correctAnswer: string;

  @Column()
  categoryId: number;
  @ManyToOne(() => CategoryEntity, (CategoryEntity) => CategoryEntity.id)
  @JoinColumn({ name: 'Categories_id' })
  category: CategoryEntity;
}
