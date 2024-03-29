import { Provide, Inject, ServerlessTrigger, ServerlessTriggerType } from '@midwayjs/decorator';
import { Context, FC } from '@midwayjs/faas';
import { IDingService } from '../interface/ding';

@Provide()
export class OssOSService {
  @Inject()
  ctx: Context;

  @Inject()
  dingService: IDingService;

  @ServerlessTrigger(ServerlessTriggerType.OS, {
    bucket: process.env.BUCKET_NAME,
    events: ['oss:ObjectCreated:*', 'oss:ObjectRemoved:DeleteObject'],
    filter: {
      prefix: 'image/',
      suffix: '.jpg',
    },
  })
  async handleOssCreateEvent(event: FC.OSSEvent) {
    const {
      oss: {
        bucket: { name },
        object: { key },
      },
      region,
    } = event?.events[0];
    const url = `https://${name}.oss-${region}.aliyuncs.com/${key}`;
    return this.dingService.sendMessage({ text: { content: url } });
  }
}
