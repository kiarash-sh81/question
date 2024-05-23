import { IsString, Length, Matches } from 'class-validator';
import { ConfirmedPassword } from 'src/common/decorator/password.decorator';

export class UserRegisterDto {
  @IsString()
  First_name: string;
  @IsString()
  Last_name: string;
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'کدملی شما اشتباه است!' })
  n_code: string;
  @IsString()
  @Length(6, 12, { message: 'پسورد شما باید حداقل 6 و حداکثر 12 کاراکتر باشد' })
  password: string;
  @IsString()
  @ConfirmedPassword('password')
  confirm_password: string;
}

export class UserLoginDto {
  @IsString()
  n_code: string;
  @IsString()
  password: string;
}
