import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../exception/exception-filter';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(private categoryService: UsersService) { }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Retorna los usuarios', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get('users')
    async findAll(): Promise<User[]> {
        return this.categoryService.findAll()
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Retorna un usuario por id', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Actualiza un usuario por id', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Put('users/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.categoryService.update(id, updateUserDto);
    }



    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Elimina un usuario por id', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete('users/:id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }



    //endpoints para administradores

    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Trae todos los usuarios', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('admin/users')
    async findAllUsersAdmin() {
        return this.categoryService.findAllUsersAdmin();
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Trae todo los posts', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('admin/posts')
    async findAllPostsAdmin() {
        return this.categoryService.findAllPostsAdmin();
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Elimina los usuarios por id', type: User })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete('admin/users/:id')
    async deleteAdmin(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }


}
