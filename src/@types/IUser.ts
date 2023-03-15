export type UserType = 'standard' | 'admin' | 'super' | '';

export interface IUser  {
  id: number;
  email: string;
  name: string;
  nickname: string;
  user_type: UserType;
}

export interface IUsers {
  users: IUser [];
}

export interface Login {
  email: string;
  password: string;
}