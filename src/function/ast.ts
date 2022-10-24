import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { HttpService } from '@midwayjs/axios';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { fromPairs as _fromPairs } from 'lodash';
import { ArrayExpression, ObjectExpression, Identifier } from '@babel/types';
import { ASTParamsDTO } from '../dto/ast';

@Provide()
export class ASTService {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/ast',
    method: 'get',
  })
  async handleASTEvent(@Query() param: ASTParamsDTO) {
    const { url, exportName } = param;
    const { data: codeStr }: { data: string } = await this.httpService.get(url);
    const ast = parse(codeStr, {
      sourceType: 'module',
    });
    const routes = [] as Array<{ path: string; name?: string }>;
    traverse(ast, {
      VariableDeclaration: path => {
        path.node.declarations.forEach(declaration => {
          const { id, init } = declaration;
          if ((id as Identifier).name === exportName) {
            (init as ArrayExpression).elements.forEach(
              (element: ObjectExpression) => {
                const { type, properties } = element;
                if (type === 'ObjectExpression') {
                  const arrayPairs = [];
                  properties?.forEach((property: any) => {
                    const { key, value } = property;
                    if (!key.name) return true;
                    arrayPairs.push([
                      key.name,
                      value.rawValue || value.value || undefined,
                    ]);
                  });
                  routes.push(_fromPairs(arrayPairs));
                }
              }
            );
          }
        });
      },
    });
    return routes
  }
}
