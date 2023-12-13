import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // Si no hay roles definidos, permitir el acceso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Suponiendo que el usuario está adjunto al objeto de solicitud después de la autenticación

    if (!user || !user.role) {
      // Si no hay un usuario o el usuario no tiene un rol, denegar el acceso
      return false;
    }

    return roles.includes(user.role);
  }
}





// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
// import { User } from '../../types/User';


// @Injectable()
// export class RolesStategy extends PassportStrategy(Strategy){
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: '$P4L4bR45Up3RS3CR3T4%'
//         })
//     }

//     async validateIsAdmin(payload: User) {
//         console.log("estoy en el payload" + payload);
//         if (!payload) {

//             if(payload.role != 'admin')
//             {
//                 console.log("no es admin")
//                 throw new UnauthorizedException();
//             }
//             console.log("estoy en el payload" + payload);
//             throw new UnauthorizedException();
//         }
//         console.log(payload);

//         return { userId: payload.name, username: payload.name, email: payload.email, role: payload.role }
//     }
// }