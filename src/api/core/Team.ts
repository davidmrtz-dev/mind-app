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
  limit = 10,
  excludeUser
}: {
  userId: number;
  offset: number;
  limit?: number;
  excludeUser?: boolean;
}): Promise<ITeams> => {
  const urlTail = excludeUser ? `?user_id=${userId}` : `/${userId}`;
  const result = await Http.get(`/api/v1/teams${urlTail}`, { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const searchTeamsByUser = async ({
  userId,
  keyword,
  start_at,
  end_at,
  offset,
  limit = 10
}: {
  userId: number;
  keyword: string;
  start_at: string;
  end_at: string;
  offset: number;
  limit?: number;
}): Promise<ITeams> => {
  const result = await Http.get(`/api/v1/teams/${userId}`, {
    keyword,
    start_at,
    end_at,
    offset,
    limit
  }, {
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
