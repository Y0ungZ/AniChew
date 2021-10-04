import { createContext } from 'react';
import MyPageStore from './store/my-page-store';

export const mypage = new MyPageStore();
export const MyPageContext = createContext(mypage);
export const MyPageProvider = MyPageContext.Provider;
