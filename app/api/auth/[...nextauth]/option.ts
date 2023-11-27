import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.token = account.id_token;
        return token;
      }
      return token;
    }
  },
  secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  pages: {
    signOut: '/',
    newUser: '/guide',
    signIn: '/login'
  }
};
