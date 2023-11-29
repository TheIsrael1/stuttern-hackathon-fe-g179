import NextAuth from 'next-auth/next';
import { options } from './option';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
