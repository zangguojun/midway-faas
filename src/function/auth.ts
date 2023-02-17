import { Provide, Inject, ServerlessTrigger, ServerlessTriggerType, Query, UseGuard } from '@midwayjs/decorator';
import { Context} from '@midwayjs/faas';
import { AuthGuard } from '../guard/auth.guard';

@Provide()
export class AuthService {
  @Inject()
  ctx: Context;

  @UseGuard(AuthGuard)
  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/guard/type1',
    method: 'get',
  })
  async handleType1(@Query() param: any) {
    return 'type1'
  }

  @UseGuard(AuthGuard)
  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/guard/type2',
    method: 'get',
  })
  async handleType2(@Query() param: any) {
    return 'type2'
  }
}
