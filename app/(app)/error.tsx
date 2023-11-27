'use client';

import LoginBtn from '@/components/login-btn';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(`${error?.message}`);
    console.log(`details`, error?.message, error?.digest);
  }, [error]);

  return (
    <main className="flex container px-container-base h-full flex-col gap-8 items-center justify-center">
      <h2 className="text-center text-white">Something went wrong! Pls login again</h2>

      <div className="max-w-[20rem] mx-auto">
        <LoginBtn />
      </div>
    </main>
  );
}
