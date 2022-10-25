import { ParseParamServiceDTO } from '../dto/ast';

export interface IAstService {
  parseAst(params: ParseParamServiceDTO): Promise<object[]>;
}
