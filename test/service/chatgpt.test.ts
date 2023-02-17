import { createApp, close } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';
import { ChatService } from "../../src/service/chatgpt.service";

describe('test/chatgpt.test.ts', () => {

  let app: ServerlessApp.Application, service: ChatService;

  beforeAll(async () => {
    app = await createApp<ServerlessApp.Framework>();
    service = await app.getApplicationContext().getAsync<ChatService>(ChatService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should send success & get response', async () => {
    await service.send('你是谁？')
  });

});
