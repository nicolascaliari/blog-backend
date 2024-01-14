import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation } from '@nestjs/swagger';


@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @ApiOperation({ summary: 'login. Admin: admin@gmail.com | password:1234' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }


  @ApiOperation({ summary: 'Register. Example: name: Nico, email: admin@gmail.com, password: 1234, role: admin' })
  @Post('auth/register')
  async register(@Body() user: RegisterAuthDto) {
    return this.authService.register(user);
  }
}
