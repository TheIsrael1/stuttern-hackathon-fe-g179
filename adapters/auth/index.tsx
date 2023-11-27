import { headers } from 'next/headers';
import { myFetch } from '..';

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

const authService = { getToken };

export default authService;
