import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { sign } from 'jsonwebtoken';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  });

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!);

  const alg = 'HS256';

  const jwt = await new jose.SignJWT({
    name: token?.name,
    email: token?.email
  })
    .setProtectedHeader({ alg })
    .sign(secret);

  requestHeaders.set('test', `test`);

  console.log('reqqhhsss', requestHeaders);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  return response;
}
