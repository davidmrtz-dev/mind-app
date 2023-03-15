import { IUser, IUserNew, UserType } from "../../@types";

export const newUser = (type: UserType): IUser => ({
  id: 0,
  email: '',
  name: '',
  nickname: '',
  user_type: type as UserType
});

export const newUserCreate = (): IUserNew => ({
  name: '',
  email: '',
  password: '',
  user_type: 'standard'
})
