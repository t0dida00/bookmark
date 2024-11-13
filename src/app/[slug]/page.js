'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getBookmarks, getBookmarksBySlug } from '../services/dataService';
import Input from '../components/Input';
import BookmarkList from '../components/BookmarkList';
import BookmarkFolder from '../components/BookmarkFolder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../store/reducers/bookMarksSlice';

const Page = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);
    const bookmarkList = userData?.data?.bookmarks?.filter(bookmark => bookmark.slug === slug)?.[0]?.data; // Filter bookmarks based on slug
    const [searching, setSearching] = useState(null);
    useEffect(() => {
        if (bookmarksStatus === 'idle') {
            dispatch(fetchBookmarks());
        }
    }, [bookmarksStatus, dispatch]);

    console.log(bookmarksStatus)
    if (!bookmarkList && bookmarksStatus === 'succeeded') {
        return (
            <div className=' h-screen w-full flex justify-center items-center flex-col'>
                <h1 className='text-[50px]'>Oops !!!</h1>
                <div>
                    The slug is invalid or not found. Please check the URL and try again.
                </div>
            </div>
        );
    }
    if (bookmarksStatus== "succeeded")
        return (
            <div className=' min-h-screen max-w-[840px] flex flex-col pt-[100px] items-center gap-10 m-auto px-2 pb-[50px]'>
                <div className='w-full flex flex-col md:flex-row-reverse md:gap-4 justify-center gap-4'>

                    <Input data={bookmarkList} setSearching={setSearching} />
                    <BookmarkFolder />
                </div>
                
                <BookmarkList data={searching || bookmarkList}  />
                <div
                    className="fixed bottom-0 left-0 w-full h-32 z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                    }}
                ></div>
            </div>
        );
    return null
}

export default Page