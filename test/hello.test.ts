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

  it('should get /', async () => {
    const result = await createHttpRequest(app).get('/').query({
      name: 'Midway.js'
    })
    expect(result.text).toEqual('Hello Midway.js');
  });

  it('should get /parseLog', async () => {
    const result = await createHttpRequest(app).get('/parseLog').query({
      // url: 'https://gitee.com/tong-cli/hello_react/raw/main/package.json',
      url: 'https://gitee.com/Balze/log/raw/main/internal/LICENSE.txt',
      keys: ["THE", "IS"]
    })
    console.log(result.text)
    // expect(result.text).toEqual('Hello Midway.js');
  });

  it('should get /reParseLog', async () => {
    const result = await createHttpRequest(app).get('/reParseLog').query({
      url: 'https://gitee.com/Balze/log/raw/main/internal/LICENSE.txt',
      reMaps: ["/THE (.*?) IS", "IS"]
    })
    console.log(result.text)
  });
});
