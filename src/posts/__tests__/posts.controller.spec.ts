import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePostsDto } from '../dto/create-posts';
import { Post } from '../schemas/posts.schema';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'), // Ensure the token matches the model name
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const postsMock: Post[] = [
        {
          title: 'Mock Post',
          content: 'Mock post content',
          author: ['John Doe'],
          category: ['Technology'],
        },
      ];
      jest.spyOn(postsService, 'findAll').mockResolvedValue(postsMock);

      const result = await controller.findAll();

      expect(result).toEqual(postsMock);
    });
  });

  describe('findOne', () => {
    it('should return a single post by id', async () => {
      const postId = '1';
      const postsMock: Post[] = [
        {
          title: 'Mock Post',
          content: 'Mock post content',
          author: ['John Doe'],
          category: ['Technology'],
        },
      ];
      jest.spyOn(postsService, 'findOne').mockResolvedValue(postsMock);

      const result = await controller.findOne(postId);

      expect(result).toEqual(postsMock);
    });

  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostsDto: CreatePostsDto = {
        title: 'New Post',
        content: 'Content of the new post',
        author: ['John Doe'],
        category: ['Technology'],
      };
      const createdPostMock: Post = {
        title: 'New Post',
        content: 'Content of the new post',
        author: ['John Doe'],
        category: ['Technology'],
      };
      jest.spyOn(postsService, 'create').mockResolvedValue(createdPostMock);

      const result = await controller.create(createPostsDto);

      expect(result).toEqual(createdPostMock);
    });
  });



  // Similar tests for update, delete, searchPosts, and filterPosts can be added here
});
