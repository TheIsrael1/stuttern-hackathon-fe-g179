import LoginBtn from '@/components/login-btn';
import React from 'react';

const page = () => {
  return (
    <main className="flex container px-container-base h-full flex-col gap-8 items-center justify-center">
      <h2 className="text-center text-white">Something went wrong! Pls login again</h2>

      <div className="max-w-[20rem] mx-auto">
        <LoginBtn />
      </div>
    </main>
  );
};

export default page;
