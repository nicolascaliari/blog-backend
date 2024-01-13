import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { CreatePostsDto } from '../dto/create-posts';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts.module';
import { UsersModule } from '../../users/users.module';


describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb+srv://nicolascaliari28:iselec450@cluster0.xhcenwi.mongodb.net/blog?retryWrites=true&w=majority'),
        PostsModule,
        forwardRef(() => UsersModule),
      ],
      controllers: [PostsController],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });


  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result: any = []; // Mock your expected result
      jest.spyOn(postsService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single post by ID', async () => {
      const result: any = []; // Mock your expected result
      const id = '1';
      jest.spyOn(postsService, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
    });
  });

  // Add similar test cases for other controller methods...

  const createPostsDto: CreatePostsDto = {
    title: 'Test Title',
    content: 'Test Content',
    author: ['Test Author'], // Fix: Change 'Test Author' to ['Test Author']
    category: ['Test Category'],
  };

  describe('update', () => {
    it('should update a post by ID', async () => {
      const id = '1';
      const updatePostsDto: CreatePostsDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        author: ['Updated Author'], // Fix: Change 'Updated Author' to ['Updated Author']
        category: ['Updated Category'], // Fix: Change 'Updated Category' to ['Updated Category']
      }; // Mock your DTO
      const result: any = {}; // Mock your expected result

      jest.spyOn(postsService, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updatePostsDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a post by ID', async () => {
      const id = '1';
      const result: any = {}; // Mock your expected result

      jest.spyOn(postsService, 'delete').mockResolvedValue(result);

      expect(await controller.delete(id)).toBe(result);
    });
  });

  describe('searchPosts', () => {
    it('should search posts based on query, page, and pageSize', async () => {
      const query = 'testQuery';
      const page = 1;
      const pageSize = 10;
      const result: any = {}; // Mock your expected result

      jest.spyOn(postsService, 'searchPosts').mockResolvedValue(result);

      expect(await controller.searchPosts(query, page, pageSize)).toEqual({ results: result });
    });
  });

  // Add similar test cases for other controller methods...

});
