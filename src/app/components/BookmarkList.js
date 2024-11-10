import React from 'react'
import Bookmark from './Bookmark'

const BookmarkList = (props) => {
    const { data } = props;
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
            <div className='pt-2 flex flex-col gap-2'>
                {data && data && data.length > 0 && data.map((item, index) => <Bookmark key={index} data={item} />)}
                {/* <Bookmark data={data} /> */}
            </div>
        </div>
    )
}

export default BookmarkList