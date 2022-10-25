export interface IMessageOption {
  text: string;
  config: object;
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
  sendMessage(message: IMessageOption): Promise<IMessageResponse>;
}
