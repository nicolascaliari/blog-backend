import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor() { }


    async findAll() {
        return "Te traigo la data"
    }
}
