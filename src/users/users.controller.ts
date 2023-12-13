import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../exception/exception-filter';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from '../types/User';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from '../auth/guards/roles-auth.guard';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(private categoryService: UsersService) { }


    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesAuthGuard)
    @Get('users')
    async findAll(): Promise<User[]> {
        // throw new HttpException("Algo fallo", 401)
        return this.categoryService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }



    @Post('users')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.categoryService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('users/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.categoryService.update(id, updateUserDto);
    }


    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesAuthGuard)
    @Delete('users/:id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }



    //endpoints para administradores

    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesAuthGuard)
    @Get('admin/users')
    async findAllUsersAdmin() {
        return this.categoryService.findAllUsersAdmin();
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesAuthGuard)
    @Get('admin/posts')
    async findAllPostsAdmin() {
        return this.categoryService.findAllPostsAdmin();
    }

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesAuthGuard)
    // @Delete('admin/users/:id')
    // async deleteAdmin(@Param('id') id: string): Promise<User> {
    //     return this.categoryService.remove(id);
    // }


}
