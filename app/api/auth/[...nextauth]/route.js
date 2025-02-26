import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

console.log("Inside Route 123");
const handler = NextAuth(authOptions);
console.log("Inside Route");
export { handler as GET, handler as POST }

