import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
} from '@midwayjs/decorator';
import { Context, FC } from '@midwayjs/faas';

@Provide()
export class OssOSService {
  @Inject()
  ctx: Context;

  @ServerlessTrigger(ServerlessTriggerType.OS, {
    bucket: 'ossBucketName',
    events: ['oss:ObjectCreated:*', 'oss:ObjectRemoved:DeleteObject'],
  })
  async handleOssCreateEvent(event: FC.OSSEvent) {
    console.log('🚀~ 24 handleOssCreateEvent event', event);
  }
}
