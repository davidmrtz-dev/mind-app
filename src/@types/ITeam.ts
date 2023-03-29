import { IAccount } from "./IAccount";
import { IUserTeam } from "./IUserTeam";

export interface ITeamNew {
  account_id: number;
  name: string;
}

export interface ITeam extends ITeamNew {
  id: number;
  account?: IAccount;
  user_team?: IUserTeam;
}

export interface ITeams {
  teams: ITeam [];
}