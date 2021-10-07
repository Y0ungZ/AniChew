export class Review {
  constructor(
    readonly reviewId: string,
    readonly targetId: string,
    readonly userId: string,
    readonly content: string,
    readonly createdDate: Date,
    readonly modifiedDate: Date,
    readonly mine: boolean,
    readonly name: string,
    readonly nickname: string,
    readonly love: boolean,
    readonly loveCnt: number,
    readonly userAvatar: string,
  ) {}
}

export type ReviewFormMode = 'Write' | 'Read' | 'Update';

export type ReviewTarget = 'Animation' | 'Character';
