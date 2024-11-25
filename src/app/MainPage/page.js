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
                <div className='absolute top-[50px] left-[50px]'>
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