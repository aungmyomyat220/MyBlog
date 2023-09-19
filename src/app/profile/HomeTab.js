'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";
import Image from "next/image";
import Author from "../../image/author-1.jpg"
const HomeTab = () => {
    const {data :posts = []} = useQuery({queryKey: ['getPostForLoginUser'], queryFn: getPost})
    const formatDate = (date) => {
        const postDate = new Date(date);
        const now = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = now - postDate;
        const modifyTimeDiff = timeDifference + 180000

        if (timeDifference < 60000) { // Less than 1 minute
            return 'just now';
        } else if (timeDifference < 3600000) { // Less than 1 hour
            const minutesDifference = Math.floor(timeDifference / 60000);
            return minutesDifference === 1 ? '1 minute ago' : `${minutesDifference} minutes ago`;
        } else if (timeDifference < 86400000) { // Less than 1 day
            const hoursDifference = Math.floor(timeDifference / 3600000);
            return hoursDifference === 1 ? '1 hour ago' : `${hoursDifference} hours ago`;
        } else if (timeDifference < 2592000000) { // Less than 30 days (approximately 1 month)
            const daysDifference = Math.floor(timeDifference / 86400000);
            return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
        } else {
            const monthsDifference = Math.floor(timeDifference / 2592000000);
            return monthsDifference === 1 ? '1 month ago' : `${monthsDifference} months ago`;
        }
    };

    return (
        <>
            {posts.map(post => (
                    <div className='grid grid-cols-5 px-8 py-10 border-b border-gray-300 mx-5' key={post._id}>
                        <div className='flex flex-col mx-5 col-span-4'>
                            <span className='mb-3 text-gray-500'>{formatDate(post.date)}</span>
                            <span className='font-bold mb-3 text-lg'>{post.title}</span>
                            <span className='line-clamp-3'>{post.content}</span>
                        </div>
                        <div>
                            <Image src={Author} alt={post.title} width={180} height={200} className='rounded ml-7'></Image>
                        </div>
                    </div>
            ))
            }

        </>
    );
};

export default HomeTab;