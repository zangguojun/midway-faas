import { createFunctionApp, close } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';
import { createInitializeContext, createTimerEvent } from '@midwayjs/serverless-fc-trigger';
import { join } from 'path';
import { DingTIMERService } from '../src/function/ding'

describe('test/ding.test.ts', () => {

  let app: ServerlessApp.Application;
  let instance: DingTIMERService;

  beforeAll(async () => {
    app = await createFunctionApp<ServerlessApp.Framework>(join(__dirname, '../'), {
      initContext: createInitializeContext(),
    });
    instance = await app.getServerlessInstance<DingTIMERService>(DingTIMERService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should trigger timer handleHelloEvent', async () => {
    const result = await instance.handleHelloEvent(createTimerEvent());
    expect(result.success).toEqual(true);
  });

  it('should trigger timer handleCardEvent', async () => {
    const result = await instance.handleCardEvent(createTimerEvent());
    expect(result.success).toEqual(true);
  });

});
