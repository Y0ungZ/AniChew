export type AniType = 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'Special';
export type AniRate = 'ALL' | 'R12' | 'R15' | 'R18';
export type genre = {
  id: number;
  name: string;
};
export type RelatedAni = {
  id: number;
  name: string;
  koreanName: string;
};
export type Series = {
  id: number;
  name: string;
};
export const AniTypeDict = {
  1: '드라마',
  2: 'SF',
  3: '괴물',
  4: 'GL',
  5: '게임',
  6: '디멘시아',
  7: '미스테리',
  8: '소년',
  9: '뱀파이어',
  10: '학교',
  11: '키즈',
  12: 'GL',
  13: 'BL',
  14: '호러',
  15: '스릴러',
  16: '밀리터리',
  17: '액션',
  18: 'BL',
  19: '초인물',
  20: '사무라이',
  21: '패러디',
  22: '무예',
  23: '어드벤처',
  24: '청년',
  25: '스포츠',
  26: '소녀',
  27: '코메디',
  28: '심리',
  29: '19금',
  30: '여성',
  31: '하렘',
  32: '음악',
  33: '역사',
  34: '17금',
  35: '마법',
  36: '일상생활',
  37: '경찰',
  38: '초자연',
  39: '자동차',
  40: '우주',
  41: '메카',
  42: '로맨스',
  43: '판타지',
};

export class Ani {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly koreanName: string,
    readonly japaneseName: string,
    readonly type: AniType,
    readonly avgScore: number,
    readonly scoreList: number[],
    readonly episodes: number,
    readonly airedStart: Date,
    readonly airedEnd: Date | null,
    readonly rate: AniRate,
    readonly genres: genre[],
    readonly reviews: null,
    readonly relatedAnis: RelatedAni[],
    readonly seriesList: Series[],
    readonly favorite: boolean,
  ) {}
}
