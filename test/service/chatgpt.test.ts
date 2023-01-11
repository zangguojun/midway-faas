import { createApp, close } from '@midwayjs/mock';
import * as ServerlessApp from '@midwayjs/serverless-app';
import { ChatgptService } from "../../src/service/chatgpt.service";

describe('test/chatgpt.test.ts', () => {

  let app: ServerlessApp.Application, service: ChatgptService;

  beforeAll(async () => {
    app = await createApp<ServerlessApp.Framework>();
    service = await app.getApplicationContext().getAsync<ChatgptService>(ChatgptService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should get /ast/file', async () => {
    const rst = service.login({})
    console.log('🚀~ 20  result.response', rst)
  });


});
