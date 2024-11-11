import React, { useState } from 'react'
import Bookmark from './Bookmark'
import Loading from './Loading';

const BookmarkList = (props) => {
    const { data, loading, setLoading } = props;
    if (!data) return null

    // Sort bookmarks by `createdAt` in descending order
    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <div className='w-full'>
            <div className='flex justify-between flex-row w-full px-2 font-bold'>
                <div>
                    title
                </div>
                <div>
                    created at
                </div>
            </div>
            <div className='w-full border-b h-[1px] opacity-80 pt-2'>

            </div>
            <div className='pt-2 flex flex-col gap-2 relative' >
                {sortedData && sortedData.length > 0 && sortedData.map((item, index) => <Bookmark key={index} data={item} setLoading={setLoading} />)}
                {/* {!loading && (!data || data.length === 0) && (
                    <div className='text-gray-500 text-center text-[20px] pt-4'>
                        No data yet
                    </div>
                )} */}
                {loading && <Loading />}

            </div>
        </div>
    )
}

export default BookmarkList