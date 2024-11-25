'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { clearBookmark } from '../store/reducers/bookMarksSlice';
import Input from '../components/Input';
import BookmarkList from '../components/BookmarkList';
import BookmarkFolder from '../components/BookmarkFolder';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import BookmarkFolder_2 from '../components/BookmarkFolder_2';
import LoginPage from '../pages/LoginPage';
import withAuth from '../HOC/auth/withAuth';
import { signOut } from 'next-auth/react';
import { logout } from '../store/reducers/authSlice';

const Page = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const slug = params.slug; // `slug` will be either `abc`, `bcd`, etc., based on the URL
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);
    const bookmarkList = userData?.data?.bookmarks?.filter(bookmark => bookmark.slug === slug)?.[0]?.data; // Filter bookmarks based on slug
    const [searching, setSearching] = useState(null);
    const [loading, setLoading] = useState(false);

    if (slug == 'login') {
        return (<LoginPage />)
    }
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
    if (bookmarksStatus === 'loading') {
        return (
            <div className="p-0 m-0 w-full h-screen flex justify-center items-center absolute top-0 left-0">
                <Loading />
            </div>

        );
    }
    if (bookmarksStatus == "succeeded")
        return (
            <div className=' min-h-screen max-w-[840px] flex flex-col pt-[100px] items-center gap-10 m-auto px-2 pb-[50px]'>
                <div className='absolute top-[50px] left-[16px] flex flex-row gap-3 items-center lg:hover:opacity-50'>
                    <div className='h-[24px] w-[24px] rotate-180'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>

                    </div>
                    <button onClick={() => {
                        signOut({ callbackUrl: "/login" });
                        dispatch(logout());
                        dispatch(clearBookmark());
                    }} className="logout-button">
                        Logout
                    </button>
                </div>
                <div className='w-full flex flex-col md:flex-row-reverse md:gap-4 justify-center gap-4'>

                    <Input data={bookmarkList} setSearching={setSearching} setLoading={setLoading} />
                    <BookmarkFolder />
                    <ul className="group/list w-full flex gap-3 flex-wrap md:hidden" >
                        {userData.data.bookmarks.map((bookmark, index) => (<BookmarkFolder_2 key={index} data={bookmark} />))}
                    </ul>
                </div>

                <BookmarkList data={searching || bookmarkList} loading={loading} />
                <div
                    className="fixed bottom-0 left-0 w-full h-32 z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                    }}
                ></div>
            </div>
        );
    return (null)
}

export default withAuth(Page, { redirectIfAuthenticated: false });
