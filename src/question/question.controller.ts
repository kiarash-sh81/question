import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CategoryDTO } from './DTO/category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/role/Admin.role.guard';
import { QuestionDTO } from './DTO/question.dto';

@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(AdminGuard)
  @Post('/category/create')
  async createCategory(@Body() body: CategoryDTO) {
    return this.questionService.createCategory(body);
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  async createQuestion(@Body() body: QuestionDTO) {
    return this.questionService.createQuestion(body);
  }
}
