import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const BookmarkFolder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const userData = useSelector((state) => state.bookmarks);
    const bookmarkData = userData?.data?.bookmarks?.filter(bookmark => bookmark.slug === slug)?.[0]; // Filter bookmarks based on slug
    const [selectedOption, setSelectedOption] = useState(bookmarkData?.group);
    
    const router = useRouter(); // Next.js router hook
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (folder,slug) => {
        setSelectedOption(folder);
        setIsOpen(false); // Close dropdown after selection
        router.push(slug);  // This will navigate to the option (the option should be a path like '/home', '/profile', etc.)

    };

    return (
        <div className="relative px-2 w-40 hidden md:block">
            <div
                className="border border-gray-300 rounded-lg p-2 cursor-pointer flex items-end justify-between w-[150px] gap-3"
                onClick={toggleDropdown}
            >
                <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='h-[20px] w-[20px] lg:group-hover/li:fill-white'  ><path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" /></svg>
                </span>
              <span className='truncate'>
              {selectedOption}
                </span>  
            </div>
            {isOpen && (
                <div className="absolute mt-2 border border-gray-300 rounded-lg bg-white shadow-lg z-10 overflow-hidden w-[150px]">
                     {userData.data.bookmarks.map((bookmark, index) => <div
                        className="p-2 hover:bg-gray-100 cursor-pointer truncate flex justify-between items-end gap-3"
                        onClick={() => handleOptionClick(bookmark.group, bookmark.slug)}
                        title={bookmark.group}
                        key={index}
                    >
                          <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='h-[20px] w-[20px] lg:group-hover/li:fill-white'  ><path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" /></svg>
                </span>
                    <span className='truncate'>
                    {bookmark.group}
                    </span>
                      
                    </div>)}
        
                </div>
            )}
        </div>
    );
};

export default BookmarkFolder;
