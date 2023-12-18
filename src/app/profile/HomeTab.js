'use client'
import React, { useEffect, useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";
import Image from "next/image";
import {useSelector} from "react-redux";
import Like from "@/image/love.png";
import Comment from "@/image/chat.png";
import {formatDate} from "../../../api/getDate";
import { useRouter } from "next/navigation";

const HomeTab = () => {
    const router = useRouter();
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

    posts.sort((a, b) => {
        const timeDifferenceA = new Date() - new Date(a.date);
        const timeDifferenceB = new Date() - new Date(b.date);
        return timeDifferenceA - timeDifferenceB;
    });

    const handleClick = (postId) => {
        router.push(`/posts/${postId}`);
    }

    return (
        <>
            {filterPosts.map(post => (
                <div className='grid grid-cols-5 px-8 py-10 border-b border-gray-300 mx-5 cursor-pointer' key={post._id}>
                    <div className='flex flex-col mx-5 col-span-4'>
                        <span className='mb-3 text-gray-500'>{formatDate(post.date)}</span>
                        <span className='font-bold mb-3 text-lg' onClick={()=>{handleClick(post._id)}}>{post.title}</span>
                        <span className='line-clamp-3' onClick={()=>{handleClick(post._id)}}>{post.content}</span>

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
                        {post.image &&
                            <img src={post.image} alt={post.title} className='rounded ml-7 w-64 h-24 hover:scale-105 transition-transform' onClick={()=>{handleClick(post._id)}}></img>
                        }
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomeTab;