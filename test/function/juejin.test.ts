import { createFunctionApp, close } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';
import { createInitializeContext, createTimerEvent } from '@midwayjs/serverless-fc-trigger';
import { join } from 'path';
import { JuejinTIMERService } from '../../src/function/juejin'

describe('test/juejin.test.ts', () => {

  let app: ServerlessApp.Application;
  let instance: JuejinTIMERService;

  beforeAll(async () => {
    app = await createFunctionApp<ServerlessApp.Framework>(join(__dirname, '../../'), {
      initContext: createInitializeContext(),
    });
    instance = await app.getServerlessInstance<JuejinTIMERService>(JuejinTIMERService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should trigger timer handleCheckInEvent', async () => {
    const result = await instance.handleCheckInEvent(createTimerEvent());
    expect(result.success).toEqual(true);
  });

  it('should trigger timer handleDrawEvent', async () => {
    const result = await instance.handleDrawEvent(createTimerEvent());
    expect(result.success).toEqual(true);
  });

  it('should trigger timer handleDipLuckyEvent', async () => {
    const result = await instance.handleDipLuckyEvent(createTimerEvent());
    expect(result.success).toEqual(true);
  });

});
