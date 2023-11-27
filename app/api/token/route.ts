import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextApiRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  });
  console.log('tok req', token);

  return Response.json({ token });
}
