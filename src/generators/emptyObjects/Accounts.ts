import { IAccount } from "../../@types";

export const newAccount = (): IAccount => ({
  id: 0,
  name: '',
  client_name: '',
  manager_name: ''
});