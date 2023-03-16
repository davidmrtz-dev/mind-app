import { ITeam } from "./ITeam";
import { IUser } from "./IUser";

interface UserTeamBase {
  start_at: string;
  end_at: string;
  status: string;
}

export interface IUserTeamNew extends UserTeamBase {
  user_id: number;
  team_id: number;
}

export interface IUserTeam extends IUserTeamNew {
  id: number;
  user?: IUser;
  team?: ITeam;
}

export interface IUserTeams {
  user_teams: IUserTeam [];
}