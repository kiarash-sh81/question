import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.Role !== 'ADMIN') {
      throw new NotAcceptableException('شما به این بخش دسترسی ندارید!');
    }
    return true;
  }
}
