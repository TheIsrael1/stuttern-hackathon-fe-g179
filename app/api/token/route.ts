import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  });
  console.log('tok req', token);

  return Response.json({ token });
}
