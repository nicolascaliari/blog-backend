import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<User[]> {
        return this.userModel.findById(id);
    }

    async findUser(name: string, password: string): Promise<User[]> {
        return this.userModel.find({ name: name , password: password});
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

}
