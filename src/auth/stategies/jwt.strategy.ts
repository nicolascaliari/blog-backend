import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { User } from 'src/types/User';
// import { stringify } from 'querystring';


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
        //console.log("estoy en el payload" + JSON.stringify(payload));
        if (!payload) {
            throw new UnauthorizedException();
        }
        //console.log(payload);

        return { userId: payload.name, username: payload.name, email: payload.email, role: payload.role }
    }
}