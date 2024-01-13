import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user';
import { UpdateUserDto } from '../dto/update-user';
import { User } from '../schemas/user.schema';
import { Post } from '../../posts/schemas/posts.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UsersModule } from '../users.module';
import { PostsModule } from '../../posts/posts.module';



describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
              MongooseModule.forRoot('mongodb+srv://nicolascaliari28:iselec450@cluster0.xhcenwi.mongodb.net/blog?retryWrites=true&w=majority'),
              UsersModule,
              PostsModule,
            ],
            controllers: [UsersController],
          }).compile();


        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const usersMock: User[] = [
            ];
            jest.spyOn(usersService, 'findAll').mockResolvedValue(usersMock);

            const result = await controller.findAll();

            expect(result).toEqual(usersMock);
        });
    });

    describe('findOne', () => {
        it('should return a single user by id', async () => {
            const userId = '1';
            const userMock: User[] = [{
                name: 'John Doe',
                password: 'password123',
                email: 'john.doe@example.com',
                role: 'client'
            }];
            jest.spyOn(usersService, 'findOne').mockResolvedValue(userMock); // Modify this line

            const result = await controller.findOne(userId);

            expect(result).toEqual(userMock);
        });


    });

    

    describe('update', () => {
        it('should update an existing user', async () => {
            const userId = '1';
            const updateUserDto: UpdateUserDto = {
                name: 'Updated Name',
                password: 'updatedPassword123',
                email: 'updated.email@example.com',
                role: 'admin'
            };
            const updatedUserMock: User = {
                name: 'Updated Name',
                password: 'updatedPassword123',
                email: 'updated.email@example.com',
                role: 'admin'
            };
            jest.spyOn(usersService, 'update').mockResolvedValue(updatedUserMock);

            const result = await controller.update(userId, updateUserDto);

            expect(result).toEqual(updatedUserMock);
        });
    });

    describe('delete', () => {
        it('should delete an existing user', async () => {
            const userId = '1';
            const deletedUserMock: User = {
                name: 'John Doe',
                password: 'password123',
                email: 'john.doe@example.com',
                role: 'user'
            };
            jest.spyOn(usersService, 'remove').mockResolvedValue(deletedUserMock);

            const result = await controller.delete(userId);

            expect(result).toEqual(deletedUserMock);
        });
    });

    // Puedes agregar más pruebas para los métodos adicionales del controlador
});
