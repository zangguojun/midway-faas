import { Provide, Inject, ServerlessTrigger, ServerlessTriggerType } from '@midwayjs/decorator';
import { Context, FC } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import { IDingService } from '../interface/ding';
import { IJuejinService } from '../interface/juejin';

@Provide()
export class JuejinTIMERService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  juejinService: IJuejinService;

  @Inject()
  dingService: IDingService;

  @ServerlessTrigger(ServerlessTriggerType.TIMER, {
    type: 'cron',
    value: '0 25 8 * * *',
  })
  async handleCheckInEvent(event: FC.TimerEvent) {
    const { success, data: rst } = await this.juejinService.checkIn();
    if (!success) {
      return this.dingService.sendMessage({ text: { content: '- 掘金签到失败' } });
    }
    const { err_no, err_msg, data } = rst;
    if (err_no !== 0) {
      return this.dingService.sendMessage({ text: { content: `- 掘金签到失败 ${err_msg}` } });
    }
    const { incr_point, sum_point } = data;
    return this.dingService.sendMessage({
      text: { content: `- 掘金签到成功：获得${incr_point}矿石，当前总矿石：${sum_point}` },
    });
  }

  @ServerlessTrigger(ServerlessTriggerType.TIMER, {
    type: 'cron',
    value: '0 30 8 * * *',
  })
  async handleDrawEvent(event: FC.TimerEvent) {
    const { success, data: rst } = await this.juejinService.draw();
    if (!success) {
      return this.dingService.sendMessage({ text: { content: '- 掘金抽奖失败' } });
    }
    const { err_no, err_msg, data } = rst;
    if (err_no !== 0) {
      return this.dingService.sendMessage({ text: { content: `- 掘金抽奖失败 ${err_msg}` } });
    }
    const { lottery_name, draw_lucky_value, total_lucky_value } = data;
    return this.dingService.sendMessage({
      text: {
        content: `- 掘金抽奖成功：获得${lottery_name}、${draw_lucky_value}幸运值（${total_lucky_value}/6000）`,
      },
    });
  }

  @ServerlessTrigger(ServerlessTriggerType.TIMER, {
    type: 'cron',
    value: '0 35 8 * * *',
  })
  async handleDipLuckyEvent(event: FC.TimerEvent) {
    console.log('🚀~ 66 handleDipLuckyEvent event', event);
    const { success, data: rst } = await this.juejinService.dipLucky();
    if (!success) {
      return this.dingService.sendMessage({ text: { content: '- 掘金沾喜气失败' } });
    }
    const { err_no, err_msg, data } = rst;
    if (err_no !== 0) {
      return this.dingService.sendMessage({ text: { content: `- 掘金沾喜气失败 ${err_msg}` } });
    }
    const { dip_value, total_value } = data;
    return this.dingService.sendMessage({
      text: { content: `- 掘金沾喜气成功：获得${dip_value}幸运值（${total_value}/6000）` },
    });
  }
}
