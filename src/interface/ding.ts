export interface ITextMessage {
  text: string;
  msgtype: string;
}

export interface IFeedCardMessage {
  msgtype: string;
  feedCard: { links: any };
}

export interface ITemplateMessage {
  cardTemplateId: string;
}

export interface IMessageResponse {
  success: boolean;
  data: IMessageResponseData;
}

export interface IMessageResponseData {
  errcode: number;
  errmsg: string;
}

export interface IDingService {
  sendMessage(message: ITextMessage): Promise<IMessageResponse>;
  sendMessage(message: IFeedCardMessage): Promise<IMessageResponse>;
  sendMessage(message: ITemplateMessage): Promise<IMessageResponse>;
}
