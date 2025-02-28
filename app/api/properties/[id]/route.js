import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { ExplainableCursor } from 'mongodb';

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
//PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        console.log("Inside PUT router")
        await connectDB();
        const { id } = params;
        console.log("Inside Route for Pst images --", request)
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required ', { status: 401 })
        }

        const { userId } = sessionUser;
        console.log("Inside PUT 00 router userId", userId)
        console.log("Inside PUT 00 router userId", request)
        const formData = await request.formData()
        const amenities = formData.getAll('amenities')
        //Get Property to Update
        const exisitngProperty = await Property.findById(id)

        if (!exisitngProperty) {
            return new Response('Property Does not exist', { state: 404 })
        }

        //Verify Ownership

        if (exisitngProperty.owner.toString() !== userId) {
            return new Response('UnAuthorize', { state: 401 })
        }
        console.log("Inside PUT1  router")
        const propertyData = {

            name: formData.get("name"),
            type: formData.get("type"),
            description: formData.get("description"),
            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode")
            },
            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            amenities,
            rates: {
                weekly: formData.get("rates.weekly"),
                monthly: formData.get("rates.monthly"),
                nightly: formData.get("rates.nightly")
            },
            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone")
            },
            owner: userId,
        }
        console.log("Inside PUT2  router--", id)
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)
        console.log("Inside PUT3  router")
        return new Response(JSON.stringify(updatedProperty), { status: 200 })

    } catch (error) {

        return new Response(JSON.stringify({ message: `Failed to add Property : ${error}` }), { status: 500 })
    }
}