import { MidwayConfig } from '@midwayjs/core';

export default {
  // if use http/API Gateway, please set keys here.
  keys: '1666512329438_6309',
  axios: {
    clients: {
      default: {
        // baseURL: 'https://api.example.com',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 0,
        withCredentials: false,
      },
    },
  },
  typeorm: {
    dataSource: {
      default: {
        // type: 'sqlite',
        // database: join(__dirname, '../../default.sqlite'),
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: 'faas',
        synchronize: true,
        logging: false,
        entities: [
          '*/entity/*.entity.ts'
        ]
      }
    }
  }
} as MidwayConfig;
