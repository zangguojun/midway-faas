import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import { FileParamEventDTO, StrParamEventDTO } from '../dto/ast';
import { IAstService } from '../interface/ast';

@Provide()
export class AstHTTPService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Inject()
  astService: IAstService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/ast/file',
    method: 'get',
  })
  async handleFileEvent(@Query() param: FileParamEventDTO) {
    const { url, exportName } = param;
    const { data: code }: { data: string } = await this.httpService.get(url);
    return this.astService.parseAst({ code, exportName });
  }

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/ast/str',
    method: 'post',
  })
  async handleStrEvent(@Body() param: StrParamEventDTO) {
    return this.astService.parseAst(param);
  }
}
