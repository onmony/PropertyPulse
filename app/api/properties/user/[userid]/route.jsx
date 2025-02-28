import connectDB from '@/config/database';
import Property from '@/models/Property';

// /api/properties/user/:userId
export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { userid: userId } = await params;
        if (!userId) {
            return new Response("UserId is required field", { status: 400 })
        }
        const properties = await Property.find({ owner: userId })

        return new Response(JSON.stringify(properties), { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}

