import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDTO } from './DTO/category.dto';
import { QuestionDTO } from './DTO/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(categoryDto: CategoryDTO) {
    const { title } = categoryDto;
    let category = await this.categoryRepository.findOneBy({ title: title });
    if (category) {
      throw new BadRequestException('این کتگوری قبلا اضافه شده است!');
    }
    category = this.categoryRepository.create({ title: title });
    const result = this.categoryRepository.save(category);
    if (!result) {
      throw new InternalServerErrorException('ارور از سمت سرور!');
    }
    return { message: 'کتگوری اضافه شد' };
  }

  async createQuestion(questionDto: QuestionDTO) {
    const { categoryTitle, correctAnswer, options, question } = questionDto;
    const category = await this.findCategory(categoryTitle);
    const newQuestion = await this.questionRepository.create({
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      categoryId: category.id,
      category: category,
    });
    const resualt = await this.questionRepository.save(newQuestion);
    if (!resualt) {
      throw new InternalServerErrorException('ارور از سمت سرور!');
    }
    return { message: 'سوال اضافه شد' };
  }

  async findCategory(categoryTitle: string) {
    const category = await this.categoryRepository.findOneBy({
      title: categoryTitle,
    });
    if (!category) {
      throw new NotFoundException('این کتگوری وجود ندارد');
    }
    return category;
  }
}
