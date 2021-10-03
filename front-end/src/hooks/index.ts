import { useContext } from 'react';
import { UserContext } from '../stores/user';
import { AuthContext } from '../stores/auth';
import { MyPageContext } from '../stores/mypage';
import { AniContext } from '../stores/ani';
import { ReviewContext } from '../stores/review';

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(UserContext);
export const useMyPage = () => useContext(MyPageContext);
export const useAni = () => useContext(AniContext);
export const useReview = () => useContext(ReviewContext);
