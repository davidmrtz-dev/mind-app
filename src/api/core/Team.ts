import * as Http from '../Http';
import { ITeamNew, ITeam, ITeams } from '../../@types';

export const getTeams = async ({
  offset,
  limit = 10
}: {
  offset: number;
  limit?: number;
}): Promise<ITeams> => {
  const result = await Http.get('/api/v1/teams', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const getTeamsByUser = async ({
  userId,
  offset,
  limit = 10
}: {
  userId: number;
  offset: number;
  limit?: number;
}): Promise<ITeams> => {
  const result = await Http.get(`/api/v1/teams/${userId}`, { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createTeam = async (values: ITeamNew): Promise<ITeam> => {
  const result = await Http.post('/api/v1/teams', { team: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.team;
};

export const updateTeam = async (values: ITeam): Promise<ITeam> => {
  const result = await Http.put(`/api/v1/teams/${values.id}`, { team: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.team;
};

export const deleteTeam = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/teams/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
