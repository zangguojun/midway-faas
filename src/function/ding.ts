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
    value: '0 9 * * *',
  })
  async handleHelloEvent(event: FC.TimerEvent) {
    return this.dingService.sendMessage({
      text: '你好！',
      config: { msgtype: 'text' },
    });
  }
}
