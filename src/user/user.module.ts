import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/role/Admin.role.guard';
import { UserGuard } from 'src/role/User.role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthGuard, AdminGuard, UserGuard],
  exports: [UserService, AuthGuard, AdminGuard, UserGuard],
})
export class UserModule {}
