import { IUser, IUserCreate, UserType } from "../../@types";

export const newUser = (type: UserType): IUser => ({
  id: 0,
  email: '',
  name: '',
  nickname: '',
  user_type: type as UserType
});

export const newUserCreate = (): IUserCreate => ({
  name: '',
  email: '',
  password: '',
  user_type: 'standard',
  profile_attributes: {
    english_level: '',
    technical_knowledge: '',
    cv: ''
  }
})
