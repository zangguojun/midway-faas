import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { IDingService, IMessageOption } from '../interface/ding';
import { HttpService } from '@midwayjs/axios';

const webHookUrl =
  'https://oapi.dingtalk.com/robot/send?access_token=cbe7247e8eaaa42d0d808c65547ed561cf2a2563102b5ca77f8f4f275da4d9c6';

const defaultCondig = {
  msgtype: 'text',
};

@Provide()
export class DingService implements IDingService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  async sendMessage(message: IMessageOption) {
    const { text, config } = message;
    const { data, status } = await this.httpService.post(webHookUrl, {
      ...defaultCondig,
      ...config,
      text: { content: `执行：${text}` },
    });
    return {
      success: status >= 200 || status < 300,
      data,
    };
  }
}
