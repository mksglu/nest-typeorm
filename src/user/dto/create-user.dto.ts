import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  roleId:number
}
