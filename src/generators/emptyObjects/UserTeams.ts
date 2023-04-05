import { IUserTeam } from "../../@types";

export const newUserTeam = (): IUserTeam => ({
  id: 0,
  user_id: 0,
  team_id: 0,
  start_at: '',
  end_at: '',
  status: 'inactive'
});