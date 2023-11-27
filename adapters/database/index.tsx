import { dbConnectionSchemaInterface } from '@/components/db-connection/db-connection.model';
import { BASE_URL, myFetch, COMMON_HEADER, bearifyToken } from '..';
import { RequestParamsWithToken } from '../adapters.types';

const createDatabase = async ({
  params,
  token
}: RequestParamsWithToken<dbConnectionSchemaInterface>) => {
  const res = await myFetch(`${BASE_URL}/create-db`, {
    headers: {
      ...COMMON_HEADER.headers,
      Authorization: bearifyToken(token)
    },
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
  const data = res.json();

  return data;
};

const getDatabases = async ({ token }: RequestParamsWithToken<any>) => {
  try {
    const res = await myFetch(`${BASE_URL}/get-db`, {
      headers: {
        ...COMMON_HEADER.headers,
        Authorization: bearifyToken(token)
      },
      method: 'GET'
    });
    const data = res.json();

    return data;
  } catch (err) {
    console.log('error', err);
  }
};

const databaseService = { createDatabase, getDatabases };

export default databaseService;
