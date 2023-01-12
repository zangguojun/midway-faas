import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { IChatgptService } from '../interface/chatgpt';

@Provide()
export class ChatgptService implements IChatgptService {
  @Inject()
  ctx: Context;

  async login(param: any): Promise<any> {
    const { ChatGPTAPIBrowser } = await eval("import('chatgpt')");

    const api = new ChatGPTAPIBrowser({
      email: process.env.OPENAI_EMAIL,
      password: process.env.OPENAI_PASSWORD,
      captchaToken: process.env.CAPTCHA_TOKEN,
      debug: false,
      minimize: true,
    });

    await api.initSession();

    const result = await api.sendMessage('Hello World!');
    console.log(result.response);
    return result.response;
  }
}
