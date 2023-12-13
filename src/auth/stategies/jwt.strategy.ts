import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { User } from 'src/types/User';


@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '$P4L4bR45Up3RS3CR3T4%'
        })
    }

    async validate(payload: User) {
        console.log("estoy en el payload" + payload);
        if (!payload) {
            console.log("estoy en el payload" + payload);
            throw new UnauthorizedException();
        }
        if(payload.role != 'admin')
        {
            console.log("no es admin")
            throw new UnauthorizedException();
        }
        console.log(payload);

        return { userId: payload.name, username: payload.name, email: payload.email, role: payload.role }
    }
}