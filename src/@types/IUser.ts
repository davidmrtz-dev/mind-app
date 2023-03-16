export type UserType = 'standard' | 'admin' | 'super' | '';

type EnglishLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2' | '';

export interface IUser  {
  id: number;
  email: string;
  name: string;
  nickname: string;
  user_type: UserType;
  profile?: IProfile;
}

interface IProfile {
  id: number,
  user_id: number;
  english_level: EnglishLevel;
  technical_knowledge: string;
  cv: string;
}

export interface IUserNew {
  name: string;
  email: string;
  password: string;
  user_type: UserType;
  profile_attributes: IProfileNew;
}

interface IProfileNew {
  english_level: EnglishLevel;
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