import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { CreatePostsDto } from './dto/create-posts';



@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) { }
    private posts: Post[] = [];

    async findAll(): Promise<Post[]> {
        return this.postModel.find();
    }


    async findOne(id: string): Promise<Post[]> {
        return this.postModel.findById(id);
    }

    async create(createPostDto: CreatePostsDto): Promise<Post> {
        const createPost = new this.postModel(createPostDto);
        return createPost.save();
    }

    // async searchPosts(query: string, page: number, pageSize: number) {
    //     try {
    //         this.posts = await this.findAll();
    //         const filtrado = this.posts.filter((post) => {
    //             return post.title.includes(query);
    //         })

    //         return filtrado;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    async searchPosts(query: string, page: number, pageSize: number): Promise<Post[]> {
        const regex = new RegExp(`${query}`, 'i');
      
        const allPosts = await this.postModel.find({
          $or: [
            { title: { $regex: regex } },
            { content: { $regex: regex } },
            { author: { $in: [regex] } },
          ],
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean();
      
        console.log(allPosts);
      
        return allPosts;
      }
      
      





}
