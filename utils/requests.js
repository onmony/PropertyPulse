
const apiDomain = process.env.NEXT_PUBLIC_API_DOMIAN || null;
//fetching all properties
async function fetchProperties() {
    //Handling case when the API Domain url is not ready yet

    if (!apiDomain) {
        return []
    }
    try {
        const res = await fetch(`${apiDomain}/properties`);
        if (!res.ok) {
            throw new Error("Faield to Fetch Data")
        }
        return res.json();

    } catch (error) {
        console.log(error)
        return []
    }

}

//fetching only one property
async function fetchProperty(id) {
    //Handling case when the API Domain url is not ready yet

    if (!apiDomain) {
        return null;
    }
    try {
        const res = await fetch(`${apiDomain}/properties/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error("Faield to Fetch Data")
        }
        return res.json();

    } catch (error) {
        console.log(error)
        return null;
    }

}

export { fetchProperties, fetchProperty };