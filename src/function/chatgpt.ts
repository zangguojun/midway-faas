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
import { IChatgptService } from '../interface/chatgpt';

@Provide()
export class ChatgptHTTPService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  chatgptService: IChatgptService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/chatgpt/login',
    method: 'get',
  })
  @Validate()
  async handleLoginEvent(@Query() param: any) {
    return this.chatgptService.login({});
  }
}
