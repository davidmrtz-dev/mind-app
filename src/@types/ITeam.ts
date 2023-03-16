export interface ITeamNew {
  account_id: number;
  name: string;
}

export interface ITeam extends ITeamNew {
  id: number;
}

export interface ITeams {
  teams: ITeam [];
}