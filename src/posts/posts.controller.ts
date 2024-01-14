import { Body, Controller, Get, Param, Post, UseGuards, Query, Delete, Put, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from '../types/Posts';
import { CreatePostsDto } from './dto/create-posts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleGuard } from '../auth/role/role.guard';


@Controller()
export class PostsController {
    constructor(private postService: PostsService) { }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return posts' })
    @ApiResponse({ status: 200, description: 'Return posts' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get("posts")
    async findAll(): Promise<Posts[]> {
        return await this.postService.findAll();
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return one post. Example: 6567a371870a745e8b952813' })
    @ApiResponse({ status: 200, description: 'Return one post' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Posts[]> {
        return await this.postService.findOne(id);
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Return one post for user. Example: 659d621a3c3dd90518528069' })
    @ApiResponse({ status: 200, description: 'Return one post for user' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get("posts/user/:id")
    async findByUser(@Param('id') id: string) {
        return await this.postService.findByUser(id);
    }


    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Create posts. Example: title: nuevo post, content: Contenido de post, author: Nicolas, category: [1,2,3]' })
    @ApiResponse({ status: 200, description: 'Create posts' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @UseGuards(JwtAuthGuard)
    @Post("posts")
    async create(@Body() createPostsDto: CreatePostsDto, @Request() req): Promise<Posts> {
        const name = req.user.username;
        createPostsDto.author = name;
        return await this.postService.create(createPostsDto);
    }



    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Update post data. Example: title: other post' })
    @ApiResponse({ status: 200, description: 'Update post data' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
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
    @ApiOperation({ summary: 'Delete post. Example: 6567a371870a745e8b952813' })
    @ApiResponse({ status: 200, description: 'Delete post' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Posts> {
        return await this.postService.delete(id);
    }



    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Search for posts by passing a title, content or author. Example: query: new post, page:1, pageSize:2 ' })
    @ApiResponse({ status: 200, description: 'Search for posts by passing a title, content or author' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Get('posts/search')
    async searchPosts(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        const results = await this.postService.searchPosts(query, page, pageSize);
        return { results };
    }

    @ApiBearerAuth("JWT")
    @ApiOperation({ summary: 'Filter posts by category or author. Example: comedia ' })
    @ApiResponse({ status: 200, description: 'Filter posts by category or author' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @Get('posts/filter')
    async filterPosts(
        @Query('category') category: string[],
        @Query('author') author: string[],
    ): Promise<Posts[]> {
        return this.postService.filterPosts({ category, author });
    }


}
