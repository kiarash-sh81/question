import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto, UserRegisterDto } from './DTO/user.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types/payload.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registering(body: UserRegisterDto) {
    const { First_name, Last_name, n_code, password } = body;
    let user = await this.userRepository.findOneBy({ n_code });
    if (user) {
      throw new BadRequestException(
        'این شماره ملی قبلا در سامانه ثبت نام کرده است',
      );
    }
    if (!user) {
      const hashedPassword = await this.HashPassword(password);
      user = await this.userRepository.create({
        First_name,
        Last_name,
        n_code,
        password: hashedPassword,
        Role: 'USER',
      });
    }
    const newUser = await this.userRepository.save(user);
    if (!newUser) {
      throw new InternalServerErrorException('ارور از سمت سرور');
    }
    return { message: 'شما با موفقیت ثبت نام کردید' };
  }

  async login(body: UserLoginDto) {
    const { n_code, password } = body;
    const user = await this.userRepository.findOneBy({ n_code });
    if (!user) {
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است');
    }
    const payload: PayloadType = { unique: user.id };
    const token = await this.createJwtToken(payload);
    return token;
  }

  async createJwtToken(payload: PayloadType) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    return { accessToken };
  }

  async extractPayloadFromToken(token: string) {
    try {
      const payload = this.jwtService.verify<PayloadType>(token, {
        secret: process.env.JWT_SECRET,
      });
      if (typeof payload === 'object' && payload?.unique) {
        const user = await this.userRepository.findOneBy({
          id: payload.unique,
        });
        if (!user) {
          throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید!');
        }
        return user;
      }
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید!');
    } catch (error) {
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید!');
    }
  }

  async HashPassword(password: string) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}
