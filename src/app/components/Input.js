import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'; // Importing Font Awesome icon
import { addBookmark } from '../services/dataService';
import { useParams } from 'next/navigation';
import { updateBookmark } from '../store/reducers/bookMarksSlice';
import { useDispatch, useSelector } from 'react-redux';

const Input = (props) => {
    const dispatch = useDispatch();

    const { data, setSearching, setLoading } = props
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const inputRef = useRef(null);
    const userData = useSelector(state => state.auth)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            processInput(inputValue);
            setInputValue('');
            filterBookmarks(null)
            inputRef.current.blur(); // Blurs the input field to hide the keyboard

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


        const urlPattern = /^(http:\/\/|https:\/\/)/;

        if (urlPattern.test(value)) {
            processInput(value);
            setInputValue('');
        }
        else {
            filterBookmarks(value);
        }
    };
    const processInput = async (value) => {
        if (value.trim() === '') return;  // Ensure input is not empty
        let type;
        let link = '';
        let title = value;

        if (value.startsWith('http://') || value.startsWith('https://')) {
            type = 'link';
            link = value;
            try {
                const response = await fetch('/api/data/get-title', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: value })
                });

                const data = await response.json();
                if (data.title) {
                    title = data.title;
                } else {
                    // Fallback to a default title if none is found
                    const url = new URL(value);
                    title = url.hostname.replace('www.', '').split('.')[0];
                }
            } catch (error) {
                console.error("Error fetching site title:", error);
            }
        } else if (value.startsWith('#')) {
            type = 'color';
        } else {
            type = 'text';
        }

        const newBookmark = {
            title,
            type,
            link,
            createdAt: new Date().toISOString(),
        };
        try {
            setLoading(true);  // Show loading spinner while adding bookmark
            const data = await addBookmark(userData?.user.email, newBookmark, slug);
            dispatch(updateBookmark(data));
            setInputValue('');  // Clear the input field
            setLoading(false);  // Show loading spinner while adding bookmark
        } catch (error) {
            console.error("Error submitting bookmark:", error);
        }

    };
    return (
        <div className="w-full lg:w-full ">
            <div className="relative flex items-center">
                <FaPlus className="absolute left-3 text-gray-400 text-[16px]" />
                <input
                    value={inputValue}
                    ref={inputRef}
                    onChange={handleChange} // Detect link pattern in real-time
                    onKeyDown={handleKeyDown} // Capture Enter key
                    type="text"
                    id="name"
                    placeholder="Enter a link, color or hex code"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
            </div>
        </div>
    );
}

export default Input