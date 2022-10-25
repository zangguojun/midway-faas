import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { IDingService, IMessageOption } from '../interface/ding';
import { HttpService } from '@midwayjs/axios';
import { webHookUrl } from '../utils/const';
// import { getSign } from '../utils';

const defaultConfig = {
  msgtype: 'text',
};

@Provide()
export class DingService implements IDingService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  async sendMessage(message: IMessageOption) {
    const { data, status } = await this.httpService.post(
      webHookUrl,
      {
        ...defaultConfig,
        ...message,
      },
      {
        // params: getSign(),
      }
    );
    return {
      success: status >= 200 || status < 300,
      data,
    };
  }
}
