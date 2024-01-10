import { Body, Controller, Get, Param, Post, UseGuards, Query, Delete, Put, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from '../types/Posts';
import { CreatePostsDto } from './dto/create-posts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';


@Controller()
export class PostsController {
    constructor(private postService: PostsService) { }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Trae todos los posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get("posts")
    async findAll(): Promise<Posts[]> {
        return await this.postService.findAll();
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Trae un posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Posts[]> {
        return await this.postService.findOne(id);
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Trae un posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Get("posts/user/:id")
    async findByUser(@Param('id') id: string) {
        return await this.postService.findByUser(id);
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Crea un posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @UseGuards(JwtAuthGuard)
    @Post("posts")
    async create(@Body() createPostsDto: CreatePostsDto , @Request() req): Promise<Posts> {

        const name = req.user.username;

        createPostsDto.author = name;

        return await this.postService.create(createPostsDto);
    }



    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Actualiza un posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostsDto: CreatePostsDto
    ): Promise<Posts> {
        return await this.postService.update(id, updatePostsDto);
    }


    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Elimina un posts'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Posts> {
        return await this.postService.delete(id);
    }



    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Busca posts pasando un titulo, contenido o autor'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Get('posts/search')
    async searchPosts(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        console.log(query, page, pageSize);

        const results = await this.postService.searchPosts(query, page, pageSize);
        return { results };
    }

    @ApiBearerAuth("JWT")
    @ApiResponse({ status: 200, description: 'Filtra los posts por categoria o autor'})
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @Get('posts/filter')
    async filterPosts(
        @Query('category') category: string[],
        @Query('author') author: string[],
    ): Promise<Posts[]> {
        return this.postService.filterPosts({ category, author });
    }


}
