import * as Http from '../Http';
import { IUserTeamNew, IUserTeam, IUserTeams } from '../../@types';

export const getUserTeams = async ({
  offset,
  limit = 5
}: {
  offset: number;
  limit?: number;
}): Promise<IUserTeams> => {
  const result = await Http.get('/api/v1/user_teams', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createUserTeam = async (values: IUserTeamNew): Promise<IUserTeam> => {
  const result = await Http.post('/api/v1/user_teams', { user_team: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.user_team;
};

export const updateUserTeam = async (values: IUserTeam): Promise<IUserTeam> => {
  const result = await Http.put(`/api/v1/user_teams/${values.id}`, { user_team: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.user_team;
};

export const deleteUserTeam = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/user_teams/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
