import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { IDingService } from '../interface/ding';
import { HttpService } from '@midwayjs/axios';
import { getSign } from '../lib/util';

const defaultConfig = {
  msgtype: 'text',
};

@Provide()
export class DingService implements IDingService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  async sendMessage(message) {
    const rst = await this.httpService.post(
      process.env.BOT_HOOK_URL,
      {
        ...defaultConfig,
        ...message,
      },
      {
        params: getSign(),
      }
    );
    const { data, status } = rst;
    return {
      success: status >= 200 || status < 300,
      data,
    };
  }
}
