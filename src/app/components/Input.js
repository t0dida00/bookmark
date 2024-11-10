import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'; // Importing Font Awesome icon
import { addBookmark } from '../services/dataService';

const Input = (props) => {
    const { setBookmarks, data, setSearching } = props
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            processInput(inputValue);
            setInputValue('');
            filterBookmarks(null)
        }
    };
    const filterBookmarks = (searchTerm) => {
        if (!searchTerm) {
            // If search is empty, show the original list
            setSearching(null);
            return;
        }
        const filteredBookmarks = data.filter((bookmark) =>
            bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearching(filteredBookmarks)
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        filterBookmarks(value);

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
            const data = await addBookmark(newBookmark);
            setBookmarks(data.data.bookmarks)
            setInputValue('');  // Clear the input field
        } catch (error) {
            console.error("Error submitting bookmark:", error);
        }

    };
    return (
        <div className="w-full lg:w-full px-2 ">
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