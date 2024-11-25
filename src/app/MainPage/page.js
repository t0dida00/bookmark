// app/page.js
'use client';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkFolder_2 from '../components/BookmarkFolder_2';
import { signOut } from "next-auth/react";
import withAuth from '../HOC/auth/withAuth';
import { logout } from '../store/reducers/authSlice';
import { clearBookmark } from '../store/reducers/bookMarksSlice';

const MainPage = () => {
    const dispatch = useDispatch();
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);
    const user = useSelector((state) => state.auth);

    if (bookmarksStatus == "succeeded")
        return (
            <div className=' min-h-screen justify-center flex items-center flex-wrap flex-col relative'>
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

                <div className=' flex h-full flex-col flex-wrap justify-center items-start px-4 sm:w-[600px]'>
                    <span className='text-[40px]'>Welcome, <span className='font-bold text-white bg-[#0B4A3B] p-2 rounded-lg'>
                        {user?.user?.name}</span> </span>
                    <span className='text-[20px] pt-2'>Those are you bookmark folder</span>

                    <ul className="group/list w-full mt-10 flex gap-2 sm:gap-3 flex-wrap" >
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

export default withAuth(MainPage, { redirectIfAuthenticated: false });