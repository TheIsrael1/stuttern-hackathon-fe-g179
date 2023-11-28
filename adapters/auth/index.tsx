import { headers } from 'next/headers';
import { BASE_URL, myFetch, COMMON_HEADER, bearifyToken } from '..';
import { RequestParamsWithToken } from '../adapters.types';

const getToken = async () => {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');

    const res = await myFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token`, {
      headers: {
        Cookie: cookie
      } as unknown as HeadersInit
    });
    const data = res.json();

    return data;
  } catch (err) {
    console.log(`Something happened!`, err);
  }
};

const login = async ({ token }: RequestParamsWithToken<null>) => {
  try {
    const res = await myFetch(`${BASE_URL}/auth/login`, {
      headers: {
        ...COMMON_HEADER.headers,
        Authorization: bearifyToken(token)
      },
      method: 'POST'
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(`Something happened!`, err);
  }
};

const authService = { getToken, login };

export default authService;
