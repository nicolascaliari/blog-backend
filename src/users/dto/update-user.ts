import {IsString, IsEmail} from 'class-validator'


export class UpdateUserDto
{
    @IsString()
    readonly name?: string;
    
    @IsString()
    readonly password?: string;

    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly role?: string;
}