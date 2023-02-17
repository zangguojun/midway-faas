import { Inject, Provide, Init, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { SendMessageOptions, IChatService, ChatGPTAPI } from '../interface/chatgpt';

@Provide()
@Scope(ScopeEnum.Singleton)
export class ChatService implements IChatService {
  @Inject()
  ctx: Context;

  api: ChatGPTAPI

  @Init()
  async initMethod() {
    const { ChatGPTAPI } = await eval("import('chatgpt')");

    this.api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async send(text: string, opts?: SendMessageOptions): Promise<any> {
    return this.api.sendMessage(text, opts);
  }
}
