import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const BookmarkFolder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL

    const [selectedOption, setSelectedOption] = useState(slug);
    const router = useRouter(); // Next.js router hook

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close dropdown after selection
        router.push(option);  // This will navigate to the option (the option should be a path like '/home', '/profile', etc.)

    };

    return (
        <div className="relative px-2 w-40">
            <div
                className="border border-gray-300 rounded-lg p-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedOption}
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-full border border-gray-300 rounded-lg bg-white shadow-lg z-10 overflow-hidden">
                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('abc')}
                    >
                        abc
                    </div>
                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('edf')}
                    >
                        edf
                    </div>
                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('ade')}
                    >
                        ade
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookmarkFolder;
