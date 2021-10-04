import { Ani } from '../stores/ani/model/ani';
import { AniStore } from '../stores/ani/store/ani-store';
import { Character } from '../stores/character/model/character';
import { CharacterStore } from '../stores/character/store/character-store';

export type Store = AniStore | CharacterStore;
export type Info = Ani | Character;
