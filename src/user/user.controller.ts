import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto, UserRegisterDto } from './DTO/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async registerUser(@Body() userDto: UserRegisterDto) {
    return await this.userService.registering(userDto);
  }

  @Post('/login')
  async loginUser(@Body() userDto: UserLoginDto) {
    return await this.userService.login(userDto);
  }
}
