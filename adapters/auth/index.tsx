import { headers } from 'next/headers';
import { myFetch } from '..';

const getToken = async () => {
  try {
    const res = await myFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token`, {
      headers: headers()
    });
    const data = res.json();

    return data;
  } catch (err) {
    console.log(`Something happened!`, err);
  }
};

const authService = { getToken };

export default authService;
