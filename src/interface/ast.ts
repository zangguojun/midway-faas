import { ParseParamServiceDTO } from '../dto/ast.dto';

export interface IAstService {
  parseAst(params: ParseParamServiceDTO): Promise<object[]>;
}
