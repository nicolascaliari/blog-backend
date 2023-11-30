import { Body, Controller, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/types/Posts';
import { CreatePostsDto } from './dto/create-posts';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }


   // @UseGuards(JwtAuthGuard)
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
    

}
