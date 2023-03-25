import { ITeam } from "./ITeam";

export type UserType = 'standard' | 'admin' | 'super' | '';

type EnglishLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2' | '';

export interface IUserCreate {
  name: string;
  email: string;
  password?: string;
  user_type: UserType;
  profile_attributes: IProfileNew;
  teams?: ITeam [];
}

export interface IUserUpdate extends IUserCreate {
  id: number;
}
export interface IUser  {
  id: number;
  email: string;
  name: string;
  nickname: string;
  user_type: UserType;
  profile?: IProfile;
}

interface IProfileNew {
  english_level: EnglishLevel;
  technical_knowledge: string;
  cv: string;
}

interface IProfile extends IProfileNew {
  id: number,
  user_id: number;
}

export interface IUsers {
  users: IUser [];
}

export interface Login {
  email: string;
  password: string;
}