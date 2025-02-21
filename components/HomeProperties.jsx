import React from 'react';
import Link from 'next/link';
import properties from '@/properties.json';
import PropertyCard from './PropertyCard';

const HomeProperties = () => {
    const recentProperties = properties.sort(() => (Math.random() - Math.random())).slice(0, 3);
    return (
        <>
            <section class="px-4 py-6">
                <div class="container-xl lg:container m-auto">
                    <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Recent Properties
                    </h2>
                    if (recentProperties.length === 0) ? <p>No properties found.</p> : (
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>)

                </div>
            </section>
            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/properties"
                    class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >View All Properties</Link
                >
            </section>
        </>
    )
}

export default HomeProperties