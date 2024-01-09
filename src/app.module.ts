import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, MongooseModule.forRoot('mongodb+srv://nicolascaliari28:iselec450@cluster0.xhcenwi.mongodb.net/blog?retryWrites=true&w=majority')],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
