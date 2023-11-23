import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stategies/local.startegy';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [PassportModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthService],
})
export class AuthModule {}
