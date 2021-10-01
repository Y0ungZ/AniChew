export class Review {
  constructor(
    readonly id: string,
    readonly animeId: string,
    readonly userId: string,
    readonly content: string,
    readonly createdDate: Date,
    readonly modifiedDate: Date,
    readonly mine: boolean,
    readonly name: string,
    readonly nickname: string,
  ) {}
}
