import React from 'react'
import Bookmark from './Bookmark'

const data = [{
    title: '#000000',
    createdAt: '2022-01-01',
    link: '',
    method: 'color'
},
{
    title: '#821a1a',
    createdAt: '2022-01-01',
    link: '',
    method: 'color'

},
{
    title: 'hihihihi',
    createdAt: '2022-01-01',
    link: '',
    method: 'text'

}
    ,
{
    title: 'hahaha',
    createdAt: '2022-01-01',
    link: '',
    method: 'text'

},
{
    title: 'Google',
    createdAt: '2022-01-01',
    link: 'https://www.google.com/',
    method: 'link'

},
    ,
{
    title: 'Chiang',
    createdAt: '2022-01-01',
    link: 'https://v4.brittanychiang.com/',
    method: 'link'

},
{
    title: 'Github',
    createdAt: '2022-01-01',
    link: 'https://github-lookup-nine.vercel.app/',
    method: 'link'

}
    ,
{
    title: 'Zing',
    createdAt: '2022-01-01',
    link: 'https://znews.vn/',
    method: 'link'

}
]

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
                {data.bookmarks && data.bookmarks.length > 0 && data.bookmarks.map((item, index) => <Bookmark key={index} data={item} />)}
                {/* <Bookmark data={data} /> */}
            </div>
        </div>
    )
}

export default BookmarkList