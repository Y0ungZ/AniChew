import { AniStore } from '../stores/ani/store/ani-store';
import { CharacterStore } from '../stores/character/store/character-store';
import { Store } from '../types/common';

export function isAnimation(store: Store): store is AniStore {
  return (store as AniStore).ani !== undefined;
}

export function isCharacter(store: Store): store is CharacterStore {
  return (store as CharacterStore).character !== undefined;
}
