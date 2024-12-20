'use client'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import getFaviconUrl from '../utils/getFavicon';
import getDomainFromUrl from '../utils/getDomainFromUrl';
import { truncateText } from '../utils/truncateText';

const Bookmark = (props) => {
    const [showCopied, setShowCopied] = useState(false);
    const [maxLength, setMaxLength] = useState(window.innerWidth < 680 ? 100 : 50);
    const [contextMenu, setContextMenu] = useState(null); // To track the context menu state
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleResize = () => {
            setMaxLength(window.innerWidth > 680 ? 60 : window.innerWidth > 500 ? 30 : 15);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (!props.data) return null
    const { title, createdAt, link, type } = props.data

    const handleClick = () => {
        // Copy the link to the clipboard
        if (title) {
            navigator.clipboard.writeText(title)
                .then(() => {
                    console.log('Link copied to clipboard');
                })
                .catch((err) => {
                    console.error('Failed to copy link: ', err);
                });

            // Replace the title after clicking
            setShowCopied(true);
            setTimeout(() => {
                setShowCopied(false);
            }, 500); // 1 second (1000ms)
        }
    }

    const handleRightClick = (e) => {
        e.preventDefault();  // Prevent the default browser context menu
        console.log('click right')
        // Get the mouse position where the right-click happened
        const { clientX, clientY } = e;

        // Set the position of the custom context menu
        setMenuPosition({ x: clientX, y: 20 });
        console.log({ x: clientX - 5, y: 20 })
        // Show the custom context menu
        setContextMenu(true);
    }
    const handleCloseMenu = () => {
        setContextMenu(null);
    }
    const renderBookmarkContent = () => {
        if (type === 'color') {
            return (
                <div className=' group/card flex justify-between rounded-md flex-row w-full h-max transition cursor-pointer relative p-2 hover:bg-[#0B4A3B] hover:text-white ' onClick={handleClick} title={title} onContextMenu={handleRightClick}>
                    <div className='flex gap-4 flex-row items-center relative'>
                        <div className={` pt-[2px] flex flex-row gap-2 absolute w-max transition-opacity duration-300 ease-in-out ${showCopied ? 'opacity-0' : 'opacity-100'}`}>
                            <div className='rounded-2xl w-[20px] h-[20px]' style={{ background: title }} ></div>
                            <span>
                                {title}
                            </span>
                        </div>
                        <div className={` pt-[2px] flex flex-row gap-2 absolute transition-opacity duration-300 ease-in-out ${showCopied ? 'opacity-100' : 'opacity-0'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-[20px] h-[20px] group-hover/card:fill-white'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            Copied
                        </div>
                    </div>

                    <div className='pt-[2px]'>
                        {format(new Date(createdAt), 'MMM dd')}
                    </div>
                    {contextMenu && (
                        <div
                            className="absolute p-2 bg-white border border-gray-300 rounded-md shadow-md"
                            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
                            onMouseLeave={handleCloseMenu} // Hide menu when mouse leaves
                        >
                            <div className="p-2 text-black z-99">Test</div>
                        </div>
                    )}
                </div>
            );
        }

        if (type === "link") {
            return (
                <div className=' group/card flex justify-between rounded-md  flex-row w-full  h-max transition cursor-pointer relative p-2 hover:bg-[#0B4A3B] hover:text-white' onClick={() => window.open(link, '_blank')} title={title}>
                    <div className='flex gap-4 flex-row items-center relative'>
                        <div className={`pt-[2px] flex flex-row gap-2 absolute w-max transition-opacity duration-300 ease-in-out ${showCopied ? 'opacity-0' : 'opacity-100'}`}>
                            <img src={getFaviconUrl(link)} alt={title} className="w-5 h-5 object-contain" />
                            {truncateText(title, maxLength)}
                            <span className='opacity-80 hidden text-gray-400 sm:block'>
                                {getDomainFromUrl(link)}
                            </span>
                        </div>
                    </div>

                    <div className='pt-[2px]'>
                        {format(new Date(createdAt), 'MMM dd')}
                    </div>
                </div>
            );
        }
        if (type === "text") {
            return (
                <div className=' group/card flex justify-between rounded-md  flex-row  h-max w-full transition cursor-pointer relative p-2 hover:bg-[#0B4A3B] hover:text-white ' onClick={handleClick} title={title} onContextMenu={handleRightClick} >
                    <div className='flex gap-4 flex-row items-center relative '>
                        <div className={`pt-[2px] flex flex-row gap-2  absolute w-max transition-opacity duration-300 ease-in-out ${showCopied ? 'opacity-0' : 'opacity-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-[20px] h-[20px] group-hover/card:fill-white' ><path d="M64 464c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z" /></svg>
                            {truncateText(title, maxLength)}
                        </div>
                        <div className={` pt-[2px] flex flex-row gap-2 absolute transition-opacity duration-300 ease-in-out ${showCopied ? 'opacity-100' : 'opacity-0'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-[20px] h-[20px] group-hover/card:fill-white'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            Copied
                        </div>
                    </div>

                    <div className='pt-[2px] relative'>
                        {format(new Date(createdAt), 'MMM dd')}
                    </div>
                    {contextMenu && (
                        <div
                            className="absolute p-2 bg-white border border-gray-300 rounded-md shadow-md"
                            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
                            onMouseLeave={handleCloseMenu} // Hide menu when mouse leaves
                        >
                            <div className="p-2 text-black z-99">Test</div>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    }
    return (
        <>
            {renderBookmarkContent()}

        </>


    )

}
export default Bookmark