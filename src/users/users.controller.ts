import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../exception/exception-filter';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/roles/roles.decorator';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(private categoryService: UsersService) { }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return users' })
    @ApiResponse({ status: 200, description: 'Return users', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get('users')
    async findAll(): Promise<User[]> {
        return this.categoryService.findAll()
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return one user. Example: 659d621a3c3dd90518528069' })
    @ApiResponse({ status: 200, description: 'Return one user', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Update user data. Example: name: john' })
    @ApiResponse({ status: 200, description: 'Update user data', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Put('users/:id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.categoryService.update(id, updateUserDto);
    }



    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Delete user. Example: 659d621a3c3dd90518528069' })
    @ApiResponse({ status: 200, description: 'Delete user', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete('users/:id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }




    //endpoints for administradores

    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return users. Only admins' })
    @ApiResponse({ status: 200, description: 'Return users', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('admin/users')
    async findAllUsersAdmin() {
        return this.categoryService.findAllUsersAdmin();
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return posts. Only admins' })
    @ApiResponse({ status: 200, description: 'Return posts', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('admin/posts')
    async findAllPostsAdmin() {
        return this.categoryService.findAllPostsAdmin();
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Delete user. Only admins. Example: 659d621a3c3dd90518528069' })
    @ApiResponse({ status: 200, description: 'Delete user', type: User })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete('admin/users/:id')
    async deleteAdmin(@Param('id') id: string): Promise<User> {
        return this.categoryService.remove(id);
    }


}
