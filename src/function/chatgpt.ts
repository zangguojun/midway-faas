import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { Validate } from '@midwayjs/validate';
import { HttpService } from '@midwayjs/axios';
import { IChatService } from '../interface/chatgpt';
import { sendMessageDTO } from '../dto/chatgpt.dto'

@Provide()
export class ChatHTTPService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  chatService: IChatService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/chatgpt/send',
    method: 'get',
  })
  @Validate()
  async send(@Query() param: sendMessageDTO) {
    const { text, ...opts } = param

    return this.chatService.send(text, opts);
  }
}
