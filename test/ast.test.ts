import { createFunctionApp, close, createHttpRequest } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';

describe('test/hello_aliyun.test.ts', () => {

  let app: ServerlessApp.Application;

  beforeAll(async () => {
    // create app
    app = await createFunctionApp<ServerlessApp.Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should get /ast', async () => {
    const result = await createHttpRequest(app).get('/ast').query({
      url: 'https://gitee.com/buaichiyu/spider/raw/master/route.js',
      name: 'module.exports'
    })
    expect(result.text).toEqual('Hello Midway.js');
  });

});
