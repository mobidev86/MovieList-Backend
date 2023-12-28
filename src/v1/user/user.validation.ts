
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ICreateUser, ILogin } from './user.interface';
import { errorInvalidEmail } from '../../common/string';

export class CreateUserValidator implements ICreateUser {
    @IsString({ message: 'User name must be a string' })
    @IsNotEmpty({ message: "Required field missing:'user_name'" })
    user_name!: string;

    @IsEmail({}, { message: errorInvalidEmail })
    @IsNotEmpty({ message: "Required field missing:'email'" })
    email!: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
}


export class LoginUserValidation implements ILogin {


    @IsEmail({}, { message: errorInvalidEmail })
    @IsNotEmpty({ message: "Required field missing:'email'" })
    email!: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
}