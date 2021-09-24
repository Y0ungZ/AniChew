import { notification } from 'antd';

type IconType = 'success' | 'info' | 'error' | 'warning';

const Notification = (type:IconType, msg:string, desc:string) => {
  notification[type]({
    message: msg,
    description: desc,
    duration: 2.5,
  });
};

export default Notification;
