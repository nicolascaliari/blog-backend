import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stategies/local.startegy';
import { JwtStategy } from './stategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { RolesAuthGuard } from './guards/roles-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '$P4L4bR45Up3RS3CR3T4%',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStategy, RolesAuthGuard],
  exports: [AuthService],
})
export class AuthModule { }
