import { Injectable } from '@nestjs/common';
import { User } from '../types/User';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  testUser: User;

  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) { }

  //ACA TRAEMOS AL USUARIO DE MONGO
  async validateUser(username: string, password: string) {
    try {
      const users = await this.userService.findUser(username, password);
      const user = users.find((user) => user.name === username);

      if (user && user.password === password) {
        return {
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Error while validating credentials');
    }
  }



  login(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log(user, payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
