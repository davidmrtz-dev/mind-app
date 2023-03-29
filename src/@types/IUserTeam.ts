import { Dayjs } from "dayjs";
import { ITeam, IUser } from '.';

interface UserTeamBase {
  start_at: string | Dayjs;
  end_at: string | Dayjs;
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