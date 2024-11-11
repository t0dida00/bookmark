// app/page.js
'use client';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import BookmarkList from '../components/BookmarkList'
import Input from '../components/Input'
import { getBookmarks } from '../services/dataService';
import { useRouter } from 'next/navigation';
import { list } from 'postcss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../store/reducers/bookmarksSlice';
const MainPage = () => {
    const dispatch = useDispatch();

    const router = useRouter(); // Initialize router
    const [data, setData] = useState([]);
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const list = await getBookmarks();
                if (list.bookmarks.length > 0) {
                    const firstSlug = list.bookmarks[0].slug;
                    setData(list)
                    // router.push(`/${firstSlug}`);
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks(); // Call the async function inside useEffect

    }, []);
    useEffect(() => {
        if (bookmarksStatus === 'idle') {
            dispatch(fetchBookmarks());
        }
        // if (bookmarksStatus === 'succeeded') {
        //     router.push(`/${userData?.data?.bookmarks[0].slug}`);
        // }
    }, [bookmarksStatus, dispatch]);
    if (userData?.status == "succeeded")
        return (
            <div className=' min-h-full max-w-[840px] flex items-center flex-col pt-[200px]  m-auto px-2 pb-[50px]'>
                <div className='w-max flex flex-col'>
                    <span className='text-[40px]'>Welcome, <span className='font-bold text-white bg-[#0B4A3B] p-2 rounded-lg'>
                        {userData?.data?.username}</span> </span>
                    <span className='text-[30px]'>to your bookmarks</span>
                </div>

            </div>
        )

    if (userData?.status == "loading")
        return (
            <div className='h-screen w-full flex items-center justify-center'>Loading</div>
        )
}

export default MainPage