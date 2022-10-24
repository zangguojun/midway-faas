import { Rule, RuleType } from '@midwayjs/validate';

export class ASTParamsDTO {
  @Rule(RuleType.string().uri().required())
  url: string;

  @Rule(RuleType.string().required())
  exportName: string;

  @Rule(RuleType.object())
  config: object;
}
