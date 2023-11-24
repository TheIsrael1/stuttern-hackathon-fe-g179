import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Auth = () => {
  const { data: session } = useSession();

  // check session signOut, signIn actions depending

  return <div>Auth</div>;
};

export default Auth;
