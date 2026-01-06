import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { IronSession, IronSessionData } from 'iron-session';
import { CreateUserDto } from '../user';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { AuthResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getProfile(@Session() session: IronSession<IronSessionData>) {
    return session.user;
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Session() session: IronSession<IronSessionData>): Promise<AuthResponse> {
    return this.authService.login(loginDto, session);
  }

  @Post('logout')
  logout(@Session() session: IronSession<IronSessionData>): { message: string } {
    session.destroy();
    return { message: 'Logged out successfully' };
  }

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }
}
