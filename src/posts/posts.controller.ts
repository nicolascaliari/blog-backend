import { Body, Controller, Get, Param, Post, UseGuards, Query, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from '../types/Posts';
import { CreatePostsDto } from './dto/create-posts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Posts[]> {
        return await this.postService.findAll();
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async findOne(@Param('id') id: string): Promise<Posts[]> {
        return await this.postService.findOne(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createPostsDto: CreatePostsDto): Promise<Posts> {
        return await this.postService.create(createPostsDto);
    }


    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostsDto: CreatePostsDto
    ): Promise<Posts> {
        return await this.postService.update(id, updatePostsDto);
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Posts> {
        return await this.postService.delete(id);
    }



    @Get('search')
    async searchPosts(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        console.log(query, page, pageSize);

        const results = await this.postService.searchPosts(query, page, pageSize);
        return { results };
    }

    @Get('filter')
    async filterPosts(
        @Query('category') category: string[],
        @Query('author') author: string[],
    ): Promise<Posts[]> {
        return this.postService.filterPosts({ category, author });
    }


}
