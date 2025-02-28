'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner'
import { toast } from 'react-toastify';

const ProfilePage = ({ }) => {
    const { data: session } = useSession();
    console.log('Profile Page Session--', session)
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;
    const profileImage = session?.user?.image;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProperties = async (userId) => {
            if (!userId) {
                return;
            }

            try {

                const res = await fetch(`/api/properties/user/${userId}`, { cache: 'no-store' })
                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data)
                }

            } catch (error) {
                console.log(error)

            } finally {
                console.log("inside finally")
                setLoading(false);
            }

        }
        //Fetch user properties when session is available

        if (session?.user?.id) {
            fetchUserProperties(session.user.id)
        }

    }, [session])

    console.log("Loading State--", loading)

    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm(
            'Are you Sure you want to Delete this Property ???'
        );
        if (!confirmed) {
            return;
        }
        try {

            console.log('-----------PropertyId : ', { propertyId })
            const res = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' })
            if (res.status === 200) {
                //Remove proeprty from State
                const updatedProperties = properties.filter((property) => property._id !== propertyId);
                setProperties(updatedProperties);
                toast.success("Property Deleted")
            }
            else {
                toast.error('Failed to Delete Property')
            }
        } catch (error) {
            toast.error('Failed to Delete Property')
        }
    };

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefault}
                                    alt="User"
                                    height={0}
                                    width={0}
                                    sizes='100vw'
                                />
                            </div>
                            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {profileName}</h2>
                            <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail}</h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {!loading && properties.length === 0 && (
                                <p> You have no property lsitings </p>
                            )}
                            {loading ? <Spinner loading={loading} /> : (
                                properties.map((property) => (
                                    <div className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt=""
                                                height={500}
                                                width={100}
                                                priority={true}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold">{property.name}</p>
                                            <p className="text-gray-600">
                                                {property.location.street}{' '} {property.location.city} {' '}{property.location.state}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link href={`/properties/${property._id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button" onClick={() => handleDeleteProperty(property._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;