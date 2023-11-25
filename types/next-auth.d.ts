import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      token?: string;
      email?: string;
      image?: string;
    };
  }
}
