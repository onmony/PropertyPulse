import { Db } from 'mongodb';
import GoogleProvider from 'next-auth/providers/google';
import connectDb from '@/config/database';
import User from '@/models/User';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        //Invoked on successful signin
        async signIn({ profile }) {
            //1. Connect to Db
            console.log("Inside sigIn")
            await connectDb();
            //2. Check if the user exist
            const userExist = await User.findOne({ email: profile.email })
            //3. If not create/add user in the DB 
            if (!userExist) {
                console.log('Inside user does not exist', profile)
                console.log("profile.name.slice(0, 20)--", profile.name.slice(0, 20))
                // Truncate if user name is too long
                //const user = profile.name.slice(0, 20) 
                User.create({
                    email: profile.email,
                    username: profile.name.slice(0, 20),
                    image: profile.picture
                })
                console.log("After User account creation")
            }

            //4. Return True to allow sign in
            return true;
        },
        async session({ session }) {
            //1. Get user from DB
            const user = await User.findOne({ email: session.user.email })

            //2. Assign the user id to the session 
            session.user.id = user._id.toString()
            //3. Return 
            console.log("Before retruning  session values", session)
            return session
        }
    }
}