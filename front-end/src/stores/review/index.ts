import { createContext } from 'react';
import ReviewStore from './store/review-store';

export const review = new ReviewStore();
export const ReviewContext = createContext(review);
export const ReviewProvider = ReviewContext.Provider;
