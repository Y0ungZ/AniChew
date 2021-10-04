export type FavoriteAnimeType = {
  id: number;
  name: string;
  englishName: string;
  japaneseName: string;
  koreanName: string;
  type: string;
  season: string;
};

export type FavoriteCharaType = {
  id: number;
  lastName: string;
  firstName: string;
};

export type FavoriteSeiyuType = {
  id: number;
  name: string;
};

export default class MyPageType {
  constructor(
    readonly userid: number,
    readonly nickname: string,
    readonly email: string,
    readonly avatar: string,
    readonly cover: string,
    readonly mine: boolean,
    readonly favoriteAnimes?: FavoriteAnimeType[],
    readonly favoriteCharas?: FavoriteCharaType[],
    readonly favoriteSeiyus?: FavoriteSeiyuType[],
  ) {}
}
