import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/types/User';

@Injectable()
export class RolesAuthGuard {
    constructor() { }

    async validate(payload: User) {
        
        console.log("estoy en el payload papu");

        if (!payload || payload.role !== 'admin') {
            throw new UnauthorizedException();
        }

        return { userId: payload.name, username: payload.name, email: payload.email, role: payload.role };
    }
}
