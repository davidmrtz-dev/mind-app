import { ITeam } from '.';

export interface IAccountNew {
  name: string;
  client_name: string;
  manager_name: string;
}

export interface IAccount extends IAccountNew {
  id: number;
  teams: ITeam [];
}

export interface IAccounts {
  accounts: IAccount [];
}