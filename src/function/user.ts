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
import { IUserService } from '../interface/user';


@Provide()
export class UserHTTPService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  userService: IUserService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/user/create',
    method: 'get',
  })
  @Validate()
  async create(@Query() param) {
    return this.userService.create(param);
  }

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/user/query',
    method: 'get',
  })
  @Validate()
  async query(@Query() param) {
    return this.userService.query(param);
  }

}
