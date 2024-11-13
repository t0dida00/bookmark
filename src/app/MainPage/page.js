// app/page.js
'use client';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import { getBookmarks } from '../services/dataService';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../store/reducers/bookMarksSlice';
import BookmarkFolder_2 from '../components/BookmarkFolder_2';
const MainPage = () => {
    const dispatch = useDispatch();
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);

    useEffect(() => {
        if (bookmarksStatus === 'idle') {
            dispatch(fetchBookmarks());
        }
    }, [bookmarksStatus, dispatch]);
    if (userData?.status == "succeeded")
        return (
            <div className=' min-h-screen justify-center flex items-center flex-wrap flex-col'>
                <div className=' flex h-full flex-col flex-wrap justify-center items-start px-4'>
                    <span className='text-[40px]'>Welcome, <span className='font-bold text-white bg-[#0B4A3B] p-2 rounded-lg'>
                        {userData?.data?.username}</span> </span>
                    <span className='text-[20px] pt-2'>Those are you bookmark folder</span>

                    <ul className="group/list w-full mt-10 flex gap-3 flex-wrap" >
                        {userData.data.bookmarks.map((bookmark, index) => (<BookmarkFolder_2 key={index} data={bookmark} />))}
                    </ul>

                </div>

            </div>
        )
    if (userData?.status == "loading")
        return (
            <div className='h-screen w-full flex items-center justify-center'>Loading...</div>
        )
}

export default MainPage