import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Post } from '../posts/schemas/posts.schema';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Post.name) private postModel: Model<Post>
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<User[]> {
        return this.userModel.findById(id).lean();
    }

    async findUser(name: string, password: string): Promise<User[]> {
        return this.userModel.find({ name: name, password: password });
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email: email });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createUser = new this.userModel(createUserDto);
        return await createUser.save();
    }

    async remove(id: string): Promise<User> {
        return this.userModel.deleteOne({ _id: id }).lean();
    }

    async update(id: string, updateCreateDto: UpdateUserDto): Promise<User> {
        return this.userModel.updateOne({ _id: id }, updateCreateDto).lean();
    }



    //funciones para administradores

    async findAllUsersAdmin() {
        return this.userModel.find().lean();
    }

    async findAllPostsAdmin() {
        return this.postModel.find().lean();
    }
}
