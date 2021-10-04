import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_CANCEL_LIKE_ANI,
  FAIL_GET_CHARACTER_INFO,
  FAIL_LIKE_ANI,
} from '../../../common/string-template/string-template';
import { Character } from '../model/character';
import characterRepository from '../repository/character-repository';

export interface CharacterStore {
  info: Character | null;
  favorite: boolean;
  getInfo: (id: string) => Promise<void>;
  like: (id: string) => Promise<void>;
  cancelLike: (id: string) => Promise<void>;
  setScore: (id: string, score: number) => Promise<void>;
  removeScore: (id: string) => Promise<void>;
  character: () => void;
}

export default class CharacterStoreImpl implements CharacterStore {
  info: Character | null = null;

  favorite = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getInfo(id: string) {
    try {
      const res = await characterRepository.getInfo(id);
      const {
        lastName,
        firstName,
        animes,
        seiyu,
        favorite,
        myScore,
        avgScore,
        scores,
      } = res.data;

      const scoreList = scores.map((score: number, i: number) => ({
        type: `${i + 1}점`,
        value: score,
      }));

      runInAction(() => {
        this.info = new Character(
          id,
          lastName,
          firstName,
          animes,
          seiyu,
          favorite,
          myScore,
          avgScore,
          scoreList,
        );
        this.favorite = favorite;
      });
    } catch (error) {
      runInAction(() => {
        this.info = null;
      });
      console.log(error);
      throw new Error(FAIL_GET_CHARACTER_INFO);
    }
  }

  async like(id: string) {
    try {
      await characterRepository.likeCharacter(id);
      runInAction(() => {
        this.favorite = true;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_LIKE_ANI);
    }
  }

  async cancelLike(id: string) {
    try {
      await characterRepository.cancelLikeCharacter(id);
      runInAction(() => {
        this.favorite = false;
      });
    } catch (error) {
      console.log(error);
      throw new Error(FAIL_CANCEL_LIKE_ANI);
    }
  }

  async setScore(id: string, score: number) {
    try {
      await characterRepository.setScore(id, score);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async removeScore(id: string) {
    try {
      await characterRepository.removeScore(id);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  // for runtime type check
  character() {
    return 'character';
  }
}
