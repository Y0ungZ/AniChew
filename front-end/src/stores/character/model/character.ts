import { Score } from '../../ani/model/ani';

type Anime = {
  id: string;
  name: string;
  koreanName: string;
};

type Seiyu = {
  id: string;
  name: string;
};

export class Character {
  constructor(
    readonly id: string,
    readonly lastName: string,
    readonly firstName: string,
    readonly animes: Anime[],
    readonly seiyu: Seiyu,
    readonly favorite: boolean,
    readonly myScore: number,
    readonly avgScore: number,
    readonly scores: Score[],
  ) {}
}
