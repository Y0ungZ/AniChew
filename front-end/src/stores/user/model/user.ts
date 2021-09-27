export type Gender = 'MALE' | 'FEMALE' | 'NONE';
export default class User {
  constructor(
    readonly userId: number,
    readonly nickname: string,
    readonly email: string,
    readonly avatar: string,
    readonly gender: Gender,
    readonly birthday: string,
  ) {}
}
