import { createFunctionApp, close } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';
import { createOSSEvent, createInitializeContext } from '@midwayjs/serverless-fc-trigger';
import { join } from 'path';
import { OssOSService } from '../../src/function/oss'

describe('test/oss.test.ts', () => {

  let app: ServerlessApp.Application;
  let instance: OssOSService;

  beforeAll(async () => {
    app = await createFunctionApp<ServerlessApp.Framework>(join(__dirname, '../'), {
      initContext: createInitializeContext(),
    });
    instance = await app.getServerlessInstance<OssOSService>(OssOSService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should trigger oss handleOssCreateEvent', async () => {
    const result = await instance.handleOssCreateEvent(createOSSEvent());
    expect(result.success).toEqual(true);
  });

});
