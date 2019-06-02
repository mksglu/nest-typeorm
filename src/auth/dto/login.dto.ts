import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
