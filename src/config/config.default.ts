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
} as MidwayConfig;
