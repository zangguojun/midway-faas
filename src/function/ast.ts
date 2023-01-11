import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { Validate } from '@midwayjs/validate';
import { HttpService } from '@midwayjs/axios';
import { FileParamEventDTO, StrParamEventDTO } from '../dto/ast.dto';
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
  @Validate()
  async handleFileEvent(@Query() param: FileParamEventDTO) {
    const { url, exportName } = param;
    const { data: code }: { data: string } = await this.httpService.get(url);
    return this.astService.parseAst({ code, exportName });
  }

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/ast/str',
    method: 'post',
  })
  @Validate()
  async handleStrEvent(@Body() param: StrParamEventDTO) {
    return this.astService.parseAst(param);
  }
}
