import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SearchesModule } from './searches/searches.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule, PostsModule, SearchesModule, AdminModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
