import { Controller, Request, Post, UseGuards,Get ,Body} from '@nestjs/common';
import {LocalAuthGuard} from './local-auth.guard'
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import LoginDto from './dto/login.dto'
import {ApiBearerAuth} from '@nestjs/swagger';
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
