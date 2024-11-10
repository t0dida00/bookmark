// app/page.js
'use client';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import BookmarkList from '../components/BookmarkList'
import Input from '../components/Input'
import { getBookmarks } from '../services/dataService';

const MainPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [searching, setSearching] = useState(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const list = await getBookmarks();
                setBookmarks(list.bookmarks);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks(); // Call the async function inside useEffect

    }, []);
    return (
        <div className=' min-h-full max-w-[840px] flex flex-col pt-[200px] items-center gap-10 m-auto px-2 pb-[50px]'>
            <Input setBookmarks={setBookmarks} data={bookmarks} setSearching={setSearching} />
            <BookmarkList data={searching || bookmarks} />
            <div
                className="fixed bottom-0 left-0 w-full h-32 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
            ></div>
        </div>
    )
}

export default MainPage