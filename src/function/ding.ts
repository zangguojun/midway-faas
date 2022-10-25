import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
} from '@midwayjs/decorator';
import { Context, FC } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import { IDingService } from '../interface/ding';

@Provide()
export class DingTIMERService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  dingService: IDingService;

  @ServerlessTrigger(ServerlessTriggerType.TIMER, {
    type: 'cron',
    value: '0 0 9 * * *',
  })
  async handleHelloEvent(event: FC.TimerEvent) {
    const {
      data: { data },
    } = await this.httpService.get(
      'https://api.vvhan.com/api/hotlist?type=bili'
    );
    return this.dingService.sendMessage({
      msgtype: 'feedCard',
      feedCard: {
        links: data.slice(0, 5)?.map(item => ({
          title: `${item?.title}`,
          messageURL: item?.mobilUrl,
          picURL: item?.pic,
        })),
      },
    });
  }
}
