import { Injectable } from '@nestjs/common';
import { UserServices } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserServices,
        private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = { username: loginDto.username, sub: loginDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
