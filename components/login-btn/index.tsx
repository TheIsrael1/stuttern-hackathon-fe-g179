'use client';

import { Button, cn } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import google from '@/assets/svg/login/google.svg';

const LoginBtn = () => {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/ask' })}
      fullWidth
      className={cn(
        'text-white bg-transparent h-[2.625rem] border border-gray-1 rounded-[0.25rem] w-full'
      )}
      startContent={<Image alt="" src={google} />}
      type="button"
    >
      Google Login
    </Button>
  );
};

export default LoginBtn;
