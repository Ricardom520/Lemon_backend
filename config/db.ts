const productConfig = {
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'fgjfgj123',
  database: 'lemon',
  connectionLimit: 10, // 连接限制
};

const localConfig = {
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'fgjfgj123',
  database: 'lemon',
  connectionLimit: 10, // 连接限制
};

const config = process.env.NODE_ENV ? productConfig: localConfig;

export default config;