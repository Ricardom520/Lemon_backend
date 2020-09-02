import { Controller, Post, Body, Injectable, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { AuthService } from '../logical/auth/auth.service';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

class CreateUserDto {
  @ApiPropertyOptional({ description: '用户名', example: '' })
  @IsNotEmpty({ message: '请填写用户名' })
  userName: string
  @ApiPropertyOptional({ description: '用户密码', example: '' })
  password: string
  @ApiPropertyOptional({ description: '用户邮箱', example: 'xxx@xx.com'})
  email: string
}

class LoginUserDto {
  @ApiPropertyOptional({ description: '用户名', example: '' })
  @IsNotEmpty({ message: '请填写用户名' })
  username: string
  @ApiPropertyOptional({ description: '用户密码', example: '' })
  password: string
}

@Controller('user')
@ApiTags('用户登录注册')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto)
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const authResult =  await this.authService.validateUser(loginUserDto.username, loginUserDto.password);

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          data: {
            success: false,
            msg: '账号或密码不正确'
          }
        };
      default:
        return {
          code: 600,
          data: {
            success: false,
            msg: '查无此人'
          }
        }
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('init')
  @ApiOperation({ summary: '用户初始化' })
  async init(@Query() query): Promise<any> {
    console.log(query);
  }
}
