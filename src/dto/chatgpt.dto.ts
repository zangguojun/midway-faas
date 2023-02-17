import { Rule, RuleType } from '@midwayjs/validate';

export class sendMessageDTO {
  @Rule(RuleType.string().required())
  text: string;
}
