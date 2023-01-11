import { IResult } from './common';

export interface ITextMessage {
  msgtype?: string;
  text: {
    content: string;
  };
}

export interface IFeedCardMessage {
  msgtype: string;
  feedCard: { links: any };
}

export interface ITemplateMessage {
  cardTemplateId: string;
}

export interface IMessageResponse {
  errcode: number;
  errmsg: string;
}

export interface IDingService {
  sendMessage(message: ITextMessage): Promise<IResult<IMessageResponse>>;
  sendMessage(message: IFeedCardMessage): Promise<IResult<IMessageResponse>>;
  sendMessage(message: ITemplateMessage): Promise<IResult<IMessageResponse>>;
}
