'use client';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';

const DynamicPage1 = () => {
    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    console.log("router client testing");
    const searchParamName = searchParams.get('name');
    const pathName = usePathname();
    return (
        <div>

            <button onClick={() => router.push('/')} className="bg-blue-500 p-2">Go Home {id} {searchParamName} {pathName}</button>

        </div>
    )
}

export default DynamicPage1
