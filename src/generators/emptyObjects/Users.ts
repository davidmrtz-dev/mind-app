import { IProfile, IUser, UserType } from "../../@types";

export const newUser = (type: UserType): IUser => ({
  id: 0,
  email: '',
  name: '',
  user_type: type as UserType,
  profile: {} as IProfile
});
