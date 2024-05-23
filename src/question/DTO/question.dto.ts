import { IsObject, IsString, ValidateNested } from 'class-validator';
import { OptionsType } from '../types/option.types';
import { Type } from 'class-transformer';

class OptionsDTO {
  @IsString()
  op1: string;
  @IsString()
  op2: string;
  @IsString()
  op3: string;
  @IsString()
  op4: string;
}

export class QuestionDTO {
  @IsString()
  question: string;

  @ValidateNested()
  @Type(() => OptionsDTO)
  @IsObject()
  options: OptionsType;

  @IsString()
  correctAnswer: string;

  @IsString()
  categoryTitle: string;
}
