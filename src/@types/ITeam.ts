import { IAccount } from "./IAccount";

export interface ITeamNew {
  account_id: number;
  name: string;
}

export interface ITeam extends ITeamNew {
  id: number;
  account?: IAccount;
}

export interface ITeams {
  teams: ITeam [];
}