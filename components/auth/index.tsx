'use client';

import { Button, cn } from '@nextui-org/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
// import { getToken } from 'next-auth/jwt';
import { useCallback, useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import * as jose from 'jose';
import { headers } from 'next/headers';

const Auth = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const { setAuthDetails } = useAuthStore((store) => store);

  const createToken = useCallback(async () => {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!);

    const alg = 'HS256';

    const jwt = await new jose.SignJWT({
      name: session?.user?.name,
      email: session?.user?.email
    })
      .setProtectedHeader({ alg })
      .sign(secret);

    console.log('sss', jwt);
    setAuthDetails({ token: jwt });
  }, [session]);

  useEffect(() => {
    createToken();
  }, [createToken]);

  return session && session?.user ? (
    <Link href={`/guide`} className={className}>
      <Button
        radius="full"
        endContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform ease-in-out duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        }
        className={cn('text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group ', className)}
      >
        Go to dashboard
      </Button>
    </Link>
  ) : (
    <Button
      onClick={() => signIn()}
      radius="full"
      endContent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform ease-in-out duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      }
      className={cn('text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group ', className)}
    >
      Try LobeAI
    </Button>
  );
};

export default Auth;
