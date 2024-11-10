import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'; // Importing Font Awesome icon
import { addBookmark } from '../services/dataService';

const Input = () => {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            processInput(inputValue);
            setInputValue('');
        }
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const urlPattern = /^(http:\/\/|https:\/\/)/;
        if (urlPattern.test(value)) {
            processInput(value);
            setInputValue('');
        }
    };
    const processInput = async (value) => {
        let type;
        let link = '';

        if (value.startsWith('http://') || value.startsWith('https://')) {
            type = 'link';
            link = value;
        } else if (value.startsWith('#')) {
            type = 'color';
        } else {
            type = 'text';
        }
        const newBookmark = {
            title: value,
            type,
            link,
            createdAt: new Date().toISOString(),
        };
        try {
            await addBookmark(newBookmark);
            setInputValue('');  // Clear the input field
        } catch (error) {
            console.error("Error submitting bookmark:", error);
        }

    };
    return (
        <div className="w-full lg:w-full ">
            <div className="relative flex items-center">
                <FaPlus className="absolute left-3 text-gray-400 text-[14px]" />
                <input
                    value={inputValue}
                    onChange={handleChange} // Detect link pattern in real-time
                    onKeyDown={handleKeyDown} // Capture Enter key
                    type="text"
                    id="name"
                    placeholder="Enter a link, color or hex code"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 text-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
            </div>
        </div>
    );
}

export default Input