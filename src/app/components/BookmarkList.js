import React, { useState } from 'react'
import Bookmark from './Bookmark'
import Loading from './Loading';

const BookmarkList = (props) => {
    const { data,loading } = props;
    if (!data) return null
    // Sort bookmarks by `createdAt` in descending order
    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // const sortedData = data
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
            <div className='pt-2 flex flex-col gap-2 w-full relative min-h-[500px] ' >
                {/* {sortedData && sortedData.length > 0 && sortedData.map((item, index) => <Bookmark key={index} data={item}  />)} */}
                {loading ? <Loading /> :   sortedData && sortedData.length > 0 && sortedData.map((item, index) => <Bookmark key={index} data={item}  />) }

            </div>
        </div>
    )

}

export default BookmarkList