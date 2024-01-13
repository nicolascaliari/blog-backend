import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { User } from 'src/types/User';
import { stringify } from 'querystring';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: async(_,done) => {
                const secret = this.configService.get<string>('JWT_SECRET');
                done(null,secret);
            }
        });
    }

    async validate(payload: User) {

        console.log("estoy en el payload" + JSON.stringify(payload));
       
        if (!payload) {
            console.log("no hay payload");
            throw new UnauthorizedException()
        }
        //console.log(payload);

        return { userId: payload.name, username: payload.name, email: payload.email, role: payload.role }
    }
}