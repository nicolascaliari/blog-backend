import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { CreatePostsDto } from './dto/create-posts';
import { User } from 'src/users/schemas/user.schema';



@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }
    private posts: Post[] = [];

    async findAll(): Promise<Post[]> {
        return this.postModel.find();
    }


    async findOne(id: string): Promise<Post[]> {
        return this.postModel.findById(id);
    }


    async findByUser(id: string) {
        const user = this.userModel.findById(id);
        console.log(user);
    }

    async create(createPostDto: CreatePostsDto): Promise<Post> {
        const createPost = new this.postModel(createPostDto);
        return createPost.save();
    }

    async update(id: string, updatePostDto: CreatePostsDto): Promise<Post> {
        return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    }

    async delete(id: string): Promise<Post> {
        return this.postModel.deleteOne({ _id: id }).lean();
    }


    async searchPosts(query: string, page: number, pageSize: number): Promise<Post[]> {

        try {
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
                .lean()

            console.log(allPosts);

            return allPosts;
        } catch (err) {
            console.error(err);
        }

    }

    async filterPosts(filters: { category?: string[]; author?: string[] }): Promise<Post[]> {
        const query: Record<string, any> = {};

        if (filters.category && filters.category.length > 0) {
            query.category = { $in: filters.category };
        }

        if (filters.author && filters.author.length > 0) {
            query.author = { $in: filters.author };
        }

        return this.postModel.find(query);
    }







}
