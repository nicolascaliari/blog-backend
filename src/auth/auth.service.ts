import { Injectable } from '@nestjs/common';
import { User } from '../types/User';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { find } from 'rxjs';




@Injectable()
export class AuthService {
  testUser: User;

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) { }

  //ACA TRAEMOS AL USUARIO DE MONGO
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('usuario no encontrado');
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        throw new UnauthorizedException('contraseña incorrecta');
      }

      return user;


    } catch (err) {
      console.error(err);
    }
  }


  async login(user: LoginAuthDto) {
    const { email, password } = user;

    console.log(user, email, password)


    const findUser = await this.userService.findByEmail(email);

    if (!findUser) {
      throw new UnauthorizedException('usuario no encontrado');
    }

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) {
      throw new UnauthorizedException('contraseña incorrecta');
    }

    const payload = { id: findUser._id, name: findUser.name, email: findUser.email, role: findUser.role }
    const token = this.jwtService.sign(payload)

    const data = {
      user: findUser,
      token
    };

    return data;
  }




  async register(user: RegisterAuthDto) {
    const { password } = user;

    const plainTohash = await hash(password, 10);

    user = { ...user, password: plainTohash };

    return this.userService.create(user);

  }
}
