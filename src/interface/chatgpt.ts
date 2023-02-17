import type { SendMessageOptions, ChatGPTAPI } from 'chatgpt'

export interface IChatService {
  send(text: string, opts?: SendMessageOptions): Promise<any>;
}

export {
  SendMessageOptions,
  ChatGPTAPI
}
