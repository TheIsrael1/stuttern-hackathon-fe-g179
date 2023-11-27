import { headers } from 'next/headers';
import { myFetch } from '..';
import { processError } from '@/lib/error';

const getToken = async () => {
  const res = await myFetch(`${process.env.NEXTAUTH_URL}/api/token`, {
    headers: headers()
  });
  const data = res.json();

  return data;
};

const authService = { getToken };

export default authService;
