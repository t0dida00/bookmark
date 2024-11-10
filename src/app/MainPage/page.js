// app/page.js
'use client';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import BookmarkList from '../components/BookmarkList'
import Input from '../components/Input'
import { getBookmarks } from '../services/dataService';

const MainPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const list = await getBookmarks();
                setBookmarks(list);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks(); // Call the async function inside useEffect

    }, []);
    return (
        <div className=' min-h-full max-w-[840px] flex flex-col pt-[200px] items-center gap-10 m-auto px-2'>
            <Input />
            <BookmarkList data={bookmarks} />
            <div
                className="fixed bottom-0 left-0 w-full h-32 z-0"
                style={{
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
            ></div>
        </div>
    )
}

export default MainPage