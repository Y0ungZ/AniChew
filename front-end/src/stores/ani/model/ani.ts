export type AniType = 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'Special';
export type AniRate = 'ALL' | 'R12' | 'R15' | 'R18';
export type Anigenre = {
  readonly id: string;
  readonly name: string;
};
export type AniStatus = 'OFF_AIR' | 'ON_AIR' | 'UPCOMING' | 'UNKNOWN';
export type RelatedAni = {
  readonly id: number;
  readonly name: string;
  readonly koreanName: string;
};
export type CharacterInfo = {
  id: string;
  firstName: string;
  lastName: string;
};
export type Series = {
  readonly id: number;
  readonly name: string;
};
export type Score = {
  readonly type: string;
  readonly value: number;
};
export const AniGenreDict: { [key: string]: string } = {
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
export const AniRateDict = {
  ALL: '전체 이용가',
  R12: '12세 이용가',
  R15: '15세 이용가',
  R18: '성인 이용가',
};
export const AniStatusDict = {
  OFF_AIR: '완결',
  ON_AIR: '방영중',
  UPCOMING: '미방영',
  UNKNOWN: '미상',
};

export class Ani {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly koreanName: string,
    readonly japaneseName: string,
    readonly type: AniType,
    readonly avgScore: number,
    readonly myScore: number,
    readonly scoreList: Score[],
    readonly episodes: number,
    readonly airedStart: Date,
    readonly airedEnd: Date | null,
    readonly duration: string,
    readonly status: AniStatus,
    readonly rate: AniRate,
    readonly genres: Anigenre[],
    readonly relatedAnis: RelatedAni[],
    readonly seriesList: Series[],
    readonly favorite: boolean,
    readonly synopsis: string | null,
  ) {}
}
