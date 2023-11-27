import { cookies, headers } from 'next/headers';
import { myFetch } from '..';

const getToken = async () => {
  const cookiesList = cookies();

  const res = await myFetch(`${process.env.NEXTAUTH_URL}/api/token`, {
    headers: headers()
  });
  const data = res.json();

  return data;
};

const authService = { getToken };

export default authService;
