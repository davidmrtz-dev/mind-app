import { IProfile, IUser, UserType } from "../../@types";

export const newUser = (type: UserType): IUser => ({
  id: 0,
  email: '',
  name: '',
  nickname: '',
  user_type: type as UserType,
  profile: {} as IProfile,
  teams: []
});
