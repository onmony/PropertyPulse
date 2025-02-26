import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

console.log("Inside Route");
const handler = NextAuth(authOptions);
console.log("Inside Route");
export { handler as GET, handler as POST }
