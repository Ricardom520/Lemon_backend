import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { decryptDes } from '../../utils/crypto';

const md5 = require('md5-node');

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
      const user = await this.userService.findOne_L(username);
      
      if (user) {
        const hashedPassword = user.password;
        if (md5(decryptDes(password)) === hashedPassword) {
          // 密码正确
          return {
            code: 1,
            user,
          }
        } else {
          // 密码错误
          return {
            code: 2,
            user: null,
          }
        }
      }

      // 查无此人
      return {
        code: 3,
        user: null,
      }
  }

  async certificate(user: any) {
    const payload = { username: user.username, sub: user.userId };

    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          success: true,
          token,
          uid: user.userId,
          msg: '登录成功'
        }
      }
    } catch (error) {
      return {
        code: 600,
        data: {
          success: false,
          msg: '账号密码错误'
        }
      }
    }
  }
}
