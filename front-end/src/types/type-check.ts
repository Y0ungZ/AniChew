import { AniStore } from '../stores/ani/store/ani-store';
import { Store } from './common';

export function isAnimation(store: Store): store is AniStore {
  return (store as AniStore).ani !== undefined;
}
