import { message } from 'antd';

type MessageType = 'Info' | 'Error' | 'Success' | 'Warning' | 'Loading';

export function msg(type: MessageType, text: string) {
  if (type === 'Info') {
    return message.info(text);
  }
  if (type === 'Error') {
    return message.error(text);
  }
  if (type === 'Success') {
    return message.success(text);
  }
  if (type === 'Warning') {
    return message.warning(text);
  }
  if (type === 'Loading') {
    return message.loading(text);
  }
  throw new Error(`unknown message type or text ${type} ${text}`);
}
