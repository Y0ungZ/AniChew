import { Ani } from 'stores/ani/model/ani';
import { AniStore } from 'stores/ani/store/ani-store';
import { Character } from 'stores/character/model/character';
import { CharacterStore } from 'stores/character/store/character-store';

export type Store = AniStore | CharacterStore;
export type Info = Ani | Character;
export type NotFoundType = {
  type:
    | '유저 정보'
    | '애니메이션 정보'
    | '캐릭터 정보'
    | '성우 정보'
    | '검색결과';
};
