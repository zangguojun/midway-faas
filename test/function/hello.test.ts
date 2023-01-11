import { createFunctionApp, close, createHttpRequest } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';

describe('test/hello.test.ts', () => {

  let app: ServerlessApp.Application;

  beforeAll(async () => {

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
});
