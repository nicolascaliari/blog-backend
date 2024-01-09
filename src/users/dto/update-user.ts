import {IsString, IsEmail} from 'class-validator'


export class UpdateUserDto
{
    readonly name?: string;
    
    readonly password?: string;

    readonly email?: string;

    readonly role?: string;
}