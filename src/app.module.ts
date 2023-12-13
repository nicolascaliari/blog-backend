import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PepepController } from './pepep/pepep.controller';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://nicolascaliari28:iselec450@cluster0.xhcenwi.mongodb.net/blog?retryWrites=true&w=majority')],
  controllers: [AuthController, PepepController],
  providers: [],
})
export class AppModule { }