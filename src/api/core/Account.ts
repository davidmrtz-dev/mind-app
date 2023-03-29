import * as Http from '../Http';
import { IAccountNew, IAccount, IAccounts } from '../../@types';

export const getAccounts = async ({
  offset,
  limit = 10
}: {
  offset: number;
  limit?: number;
}): Promise<IAccounts> => {
  const result = await Http.get('/api/v1/accounts', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createAccount = async (values: IAccountNew): Promise<IAccount> => {
  const result = await Http.post('/api/v1/accounts', { account: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.account;
};

export const updateAccount = async (values: IAccount): Promise<IAccount> => {
  const result = await Http.put(`/api/v1/accounts/${values.id}`, { account: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.account;
};

export const deleteAccount = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/accounts/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
