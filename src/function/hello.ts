import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import { isString as _isString } from 'lodash';
import { UrlDTO } from '../dto/hello';

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
  async handleHTTPEven1(@Query('name') name = 'midwayjs') {
    return `Hello ${name}`;
  }

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/parseLog',
    method: 'get',
  })
  async handleHTTPEvent2(@Query() urlParams: UrlDTO) {
    const rstMap = {};
    const { url, keys } = urlParams;
    const { data: fileStr }: { data: string } = await this.httpService.get(url);
    if (!_isString(fileStr)) {
      return '请检查是否为日志文件';
    }
    const strArray = fileStr?.split('\n');
    strArray.forEach(str => {
      keys.forEach(key => {
        if (str.includes(key)) {
          if (!rstMap[key]) {
            rstMap[key] = [];
          }
          rstMap[key].push(str);
        }
      });
    });
    return rstMap;
  }
}
