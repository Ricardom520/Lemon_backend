import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';

import sequelize from '../database/sequelize';
import { encryptPassword } from 'src/utils/cryptogram';
import { decryptDes } from 'src/utils/crypto';

const md5 = require('md5-node');

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @param email 用户邮箱
   */
  async findOne(email: string): Promise<any | undefined> {
    const sql = `
      SELECT
        email
      FROM
        users
      WHERE
        email = '${email}'
    `;

    try {
      const user = (await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将SQL语句打印到控制台
      }))[0];

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 用户密码 
   */
  async findOne_L(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        userId,
        username,
        password
      FROM
        users_auths
      WHERE
        username = '${username}';
    `;

    try {
      const user = (await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将SQL语句打印到控制台
      }))[0];

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { username, email, password } = requestBody;

    const user = await this.findOne(email);
    const pass = decryptDes(password);

    if (user) {
      return {
        code: 400,
        msg: '该邮箱已被注册'
      };
    } else {
      const userId = new Date().getTime()+email.substring(0,2);
      const sql1 = `
        INSERT INTO users_auths (userId, username, password)
          VALUES ('${userId}', '${username}', '${md5(pass)}');
      `;

      const sql2 = `
        INSERT INTO users (userId, email)
          VALUES ('${userId}', '${email}');
      `;

      try {
        await sequelize.query(sql1);
        await sequelize.query(sql2);
        return {
          code: 200,
          data: {
            success: true,
            msg: '注册成功'
          }
        }
      } catch (error) {
        console.log(error)
        return {
          code: 200,
          data: {
            success: false,
            msg: '注册失败'
          }
        }
      }
    }
  }

  /**
   * 登录
   * @param requestBody 请求体
   */
  async login(requestBody: any): Promise<any> {
    const { username, password } = requestBody;
    const pass = decryptDes(password);
    
    this.findOne_L(username);
  }
}
