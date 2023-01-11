import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import {Validate} from "@midwayjs/validate";

@Provide()
export class HelloHTTPService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/',
    method: 'get',
  })
  @Validate()
  async handleHelloHTTPEvent(@Query('name') name = 'midwayjs') {
    return `Hello ${name}`;
  }
}
