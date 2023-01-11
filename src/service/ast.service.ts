import { Inject, Provide } from '@midwayjs/decorator';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { fromPairs as _fromPairs } from 'lodash';
import { ArrayExpression, ObjectExpression, Identifier } from '@babel/types';
import { ParseParamServiceDTO } from '../dto/ast.dto';
import { IAstService } from '../interface/ast';
import { Context } from '@midwayjs/faas';

@Provide()
export class AstService implements IAstService {
  @Inject()
  ctx: Context;

  async parseAst(param: ParseParamServiceDTO): Promise<object[]> {
    const { code, exportName } = param;
    const ast = parse(code, {
      sourceType: 'module',
    });
    const routes = [];
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
    return routes;
  }
}
