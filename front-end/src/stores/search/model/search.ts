export type ResultAni = {
  readonly id: number;
  readonly type: 'Animation';
  readonly name: string;
  readonly image: string;
};

export type ResultChara = {
  readonly id: number;
  readonly type: 'Character';
  readonly name: string;
  readonly image: string;
};

export type ResultUser = {
  readonly id: number;
  readonly type: 'User';
  readonly name: string;
  readonly image: string;
};
