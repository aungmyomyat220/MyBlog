'use client'
import React, { useEffect, useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";
import Image from "next/image";
import {useSelector} from "react-redux";
import Like from "@/image/love.png";
import Comment from "@/image/chat.png";
const HomeTab = () => {
    const { loveData } = useSelector((state) => state.post);
    const [user, setUser] = useState({});
  useEffect(() => {
    const userData = sessionStorage['user'];
    if (userData) {
      setUser(JSON.parse(userData));
    } 
  }, []);
    const {data :posts = []} = useQuery({queryKey: ['getPostForLoginUser'], queryFn: getPost})
    const filterPosts = posts.filter((post) => (
        post.authorId === user._id
    ));

    //Date
    const formatDate = (date) => {
        const postDate = new Date(date);
        const now = new Date();
        const timeDifference = now - postDate;
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

    posts.sort((a, b) => {
        const timeDifferenceA = new Date() - new Date(a.date);
        const timeDifferenceB = new Date() - new Date(b.date);
        return timeDifferenceA - timeDifferenceB;
    });

    return (
        <>
            {filterPosts.map(post => (
                <div className='grid grid-cols-5 px-8 py-10 border-b border-gray-300 mx-5' key={post._id}>
                    <div className='flex flex-col mx-5 col-span-4'>
                        <span className='mb-3 text-gray-500'>{formatDate(post.date)}</span>
                        <span className='font-bold mb-3 text-lg'>{post.title}</span>
                        <span className='line-clamp-3'>{post.content}</span>

                        <div className='flex mr-5 cursor-pointer mt-8'>
                            {
                                <Image src={Like} alt="Like" className='w-5 h-5 mr-2'/>
                            }
                            <span>{loveData.loveCount}</span>
                            <div className='flex mr-5 cursor-pointer'>
                                <Image src={Comment} alt="Like" className='w-5 h-5 mr-2' width={0} height={0}/>
                                <span>7</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <img src={post.image} alt={post.title} className='rounded ml-7 w-64 h-24'></img>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomeTab;