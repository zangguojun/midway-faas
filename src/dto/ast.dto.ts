import { Rule, RuleType, OmitDto } from '@midwayjs/validate';

export class ParseParamServiceDTO {
  @Rule(RuleType.string().required())
  code: string;

  @Rule(RuleType.string().required())
  exportName: string;
}

export class FileParamEventDTO extends OmitDto(ParseParamServiceDTO, ['code']) {
  @Rule(RuleType.string().uri().required())
  url: string;
}

export class StrParamEventDTO extends ParseParamServiceDTO {}
