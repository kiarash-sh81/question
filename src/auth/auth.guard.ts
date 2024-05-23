import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isJWT } from 'class-validator';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || authorization.trim() == '') {
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید!');
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer.toLowerCase() !== 'bearer' || !token || !isJWT(token)) {
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید!');
    }
    const user = await this.userService.extractPayloadFromToken(token);
    request.user = user;
    return true;
  }
}
