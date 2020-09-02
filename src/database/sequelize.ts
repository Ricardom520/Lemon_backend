import { Sequelize } from 'sequelize-typescript';
import db from '../../config/db';
import { any } from 'sequelize/types/lib/operators';

// const sequelize = new Sequelize(db.mysql.database, db.mysql.user, db.mysql.password || null, {
//   host: db.mysql.host, // 数据库地址
//   port: db.mysql.port, // 自定义端口
//   pool: {
//     max: db.mysql.connectionLimit, // 连接池中最大的链接数量
//     min: 0, // 连接池中最小连接数量
//     acquire: 30000,
//     idle: 10000, // 如果一个线程10秒钟内没有被使用的话，那么久释放线程
//   },
//   timezone: '+08:00', // 东八时区
// });

const sequelize = new Sequelize(
  {
    dialect: 'mysql',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.database,
    pool: {
      max: db.connectionLimit, // 连接池中最大的链接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程10秒钟内没有被使用的话，那么久释放线程
    },
    timezone: '+08:00', // 东八时区
  }
);;

// 测试数据库连接
sequelize
  .authenticate()
  .then(()=>{
    console.log('数据连接成功');
  })
  .catch((err: any) => {
    // 数据库连接失败时打印输出
    console.error(err);
    throw err;
  });

export default sequelize;