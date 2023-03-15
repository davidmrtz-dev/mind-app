export type UserType = 'standard' | 'admin' | 'super' | '';

export interface IUser  {
  id: number;
  email: string;
  name: string;
  nickname: string;
  user_type: UserType;
  profile?: IProfile;
}

export interface IUserNew {
  name: string;
  email: string;
  password: string;
  user_type: UserType;
}

interface IProfile {
  id: number,
  user_id: number;
  english_level: string;
  technical_knowledge: string;
  cv: string;
}

export interface IUsers {
  users: IUser [];
}

export interface Login {
  email: string;
  password: string;
}