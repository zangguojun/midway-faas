import { Rule, RuleType } from '@midwayjs/validate';

export class UrlDTO {
  @Rule(RuleType.string().uri())
  url: string;

  @Rule(RuleType.array().items(RuleType.string()))
  keys: string[];
}
