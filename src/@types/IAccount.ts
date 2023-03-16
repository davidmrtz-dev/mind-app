export interface IAccount {
  id?: number;
  name: string;
  client_name: string;
  manager_name: string;
}

export interface IAccounts {
  accounts: IAccount [];
}