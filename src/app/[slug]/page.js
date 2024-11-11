'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getBookmarks, getBookmarksBySlug } from '../services/dataService';
import Input from '../components/Input';
import BookmarkList from '../components/BookmarkList';
import BookmarkFolder from '../components/BookmarkFolder';

const Page = () => {
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);
    const [searching, setSearching] = useState(null);
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const list = await getBookmarks();
                const bookmarksList = list.bookmarks.filter(bookmark => bookmark.slug === slug); // Filter bookmarks based on slug
                if (!bookmarksList || bookmarksList.length === 0) {
                    setBookmarks(null);  // If no bookmarks found, set it to null

                }
                else {
                    setBookmarks(bookmarksList[0].data);
                }
                setLoading(false);


            } catch (error) {
                console.error("Error fetching bookmarks:", error);
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, [slug]);


    if (!bookmarks) {
        return (
            <div className=' h-screen w-full flex justify-center items-center flex-col'>
                <h1 className='text-[50px]'>Oops !!!</h1>
                <div>
                    The slug is invalid or not found. Please check the URL and try again.
                </div>
            </div>
        );
    }

    return (
        <div className=' min-h-screen max-w-[840px] flex flex-col pt-[100px] items-center gap-10 m-auto px-2 pb-[50px]'>
            <div className='w-full flex flex-col md:flex-row-reverse md:gap-4 justify-center gap-4'>

                <Input setBookmarks={setBookmarks} data={bookmarks} setSearching={setSearching} setLoading={setLoading} />
                <BookmarkFolder />
            </div>
            <BookmarkList data={searching || bookmarks} setloading={setLoading} loading={loading} />
            <div
                className="fixed bottom-0 left-0 w-full h-32 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
            ></div>
        </div>
    );
}

export default Page