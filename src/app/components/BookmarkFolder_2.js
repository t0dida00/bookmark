import React from 'react'
import { useParams, useRouter } from 'next/navigation';

const BookmarkFolder_2 = (props) => {
    const router = useRouter(); // Initialize router
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const { data } = props
    if (!data) return null
    const handleClick = (slug) => {
        router.push(`/${slug}`);
    }
    return (
        <li className="group/li border p-3 rounded-md overflow-hidden 
        cursor-pointer w-[48%] max-w-none sm:max-w-[150px] sm:w-full
         lg:hover:!opacity-100 transition duration-100
         lg:hover:bg-[#0B4A3B]
          " style={slug == data.slug ? { background: "#0B4A3B" } : {}} onClick={() => handleClick(data.slug)}>
            <div className='flex w-full justify-between gap-3' >
                <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='h-[20px] w-[20px] lg:group-hover/li:fill-white' style={slug == data.slug ? { fill: "#fff" } : {}}  ><path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" /></svg>
                </span>
                <span className='text-[#0B4A3B] lg:group-hover/li:text-white truncate' style={slug == data.slug ? { color: "#fff" } : {}}  >
                    {data.group}
                </span>

            </div>

        </li>
    )
}

export default BookmarkFolder_2