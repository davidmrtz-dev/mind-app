import * as Http from '../Http';
import { IUser, IUserNew, IUsers } from '../../@types';

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

export const createUser = async (values: IUserNew): Promise<IUser> => {
  const result = await Http.post('/api/v1/users', { user: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.user;
};

export const updateUser = async (values: IUserNew): Promise<IUser> => {
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

// export const searchOutcomes = async ({
//   offset,
//   keyword,
//   start_date,
//   end_date,
//   limit = 5
// }: {
//   offset: number;
//   keyword: string;
//   start_date: string;
//   end_date: string;
//   limit?: number;
// }): Promise<IOutcomes> => {
//   const result = await Http.get('/api/outcomes/search', { limit, offset, keyword, start_date, end_date }, {
//     'access-token': sessionStorage.getItem('authorization:token') || '',
//     client: sessionStorage.getItem('authorization:client') || '',
//     uid: sessionStorage.getItem('authorization:uid') || ''
//   });

//   return result.data;
// };