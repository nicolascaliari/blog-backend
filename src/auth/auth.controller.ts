import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() user: LoginAuthDto) {

    console.log(user)

    return this.authService.login(user);
  }


  @Post('auth/register')
  async register(@Body() user: RegisterAuthDto) {
    return this.authService.register(user);
  }
}
