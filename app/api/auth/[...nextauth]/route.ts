import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
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
      }
      return token;
    }
    // async session({ session, token, user }) {
    //   session.user.token = token.id_token as string;
    //   session.user.check = token;
    //   return session;
    // }
  },
  secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  pages: {
    signOut: '/',
    newUser: '/guide'
  }
});

export { handler as GET, handler as POST };
