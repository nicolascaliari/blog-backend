import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stategies/local.startegy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './stategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '$P4L4bR45Up3RS3CR3T4%',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,LocalStrategy, JwtStategy],
  exports: [AuthService],
})
export class AuthModule { }
