import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/exception/exception-filter';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from 'src/types/User';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(private categoryService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        // throw new HttpException("Algo fallo", 401)
        
        return this.categoryService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }



    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.categoryService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.categoryService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }

}
