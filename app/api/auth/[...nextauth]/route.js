import { AuthOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

console.log("Inside Route");
const handler = NextAuth(AuthOptions);
console.log("Inside Route");
export { handler as GET, handler as POST }
