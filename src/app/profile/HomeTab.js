'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";
import Image from "next/image";
import Author from "../../image/author-1.jpg"

const HomeTab = () => {
    const {data :posts = []} = useQuery({queryKey: ['get'], queryFn: getPost})
    const formatDate = (date) => {
        const postDate = new Date(date);
        const now = new Date();

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Use 12-hour format
        };
        console.log("Post Date => "+ postDate)
        console.log("Now Date =>" +  now)

        // Calculate the time difference in seconds
        const secondsDifference = Math.floor((now - postDate) / 1000);

        if (secondsDifference < 60) {
            return 'just now';
        } else {
            // Format the postDate in 12-hour format
            return postDate.toLocaleString('en-US', options);
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