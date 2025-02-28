import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const property = await Property.findById(params.id)
        if (!property)
            return new Response('Property Not Found ', { status: 404 })

        return new Response(JSON.stringify(property), { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {

        const { id: propertyId } = await params;
        await connectDB();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User Id is required ', { status: 401 });
        }
        const { userId } = sessionUser;
        const property = await Property.findById(propertyId)
        if (!property) {
            return new Response('Property Not Found ', { status: 404 })
        }
        if (property.owner.toString() !== userId) {
            return new Response('Not Authorised', { status: 401 })
        }
        await property.deleteOne();

        return new Response('Property Deleted', { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
} 