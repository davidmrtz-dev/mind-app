import * as Http from '../Http';
import { IUser, IUserCreate, IUsers, IUserUpdate } from '../../@types';

export const getUsers = async ({
  offset,
  limit = 5
}: {
  offset: number;
  limit?: number;
}): Promise<IUsers> => {
  const result = await Http.get('/api/v1/users', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const getUser = async (id: number): Promise<IUser> => {
  const result = await Http.get(`/api/v1/users/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data.user;
};

export const createUser = async (values: IUserCreate): Promise<IUser> => {
  const result = await Http.post('/api/v1/users', { user: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.user;
};

export const updateUser = async (values: IUserUpdate): Promise<IUser> => {
  const result = await Http.put(`/api/v1/users/${values.id}`, { user: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.user;
};

export const deleteUser = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/users/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
