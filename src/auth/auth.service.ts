import { Injectable} from "@nestjs/common";
import { User } from '../types/User';


@Injectable()
export class AuthService {

    testUser: User;

    constructor() {
        this.testUser = {
            id: 1,
            name: 'nicolas',
            password: '1234',
        };
    }

    async validateUser(username: string, pass: string): Promise<User | null> {
        if (username === this.testUser.name && pass === this.testUser.password) {
            return this.testUser;
        }
        return null;
    }
}
