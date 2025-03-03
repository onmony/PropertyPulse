import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import connectDb from '@/config/database';

//While deploying to Vercel there is an issue and the below line will solve it.
//  This is from next js "Route Segment Config" section documentation 
export const dynamic = "force-dynamic";

export const POST = async (request) => {
    try {
        await connectDb();
        const { propertyId } = await request.json();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("UserId is required", { status: 401 })
        }
        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId });
        console.log("User mongoDb Value--", user)

        let isBookmarked = user.bookmarks.includes(propertyId); 
        let message;
        //check if property is already bookmarked

        if (isBookmarked) {
            //If already propertyId is Bookmarked 
            user.bookmarks.pull(propertyId);
            message = "Bookmark Removed susccessfully";
            isBookmarked = false;
        }
        else {
            //If not already bookmarked add it 
            user.bookmarks.push(propertyId);
            message = "Bookmark Added successfully";
            isBookmarked = true;
        }
        await user.save();
        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 })
    }
}