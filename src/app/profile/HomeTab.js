'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";

const HomeTab = () => {
    const {data :posts} = useQuery({queryKey: ['get'], queryFn: getPost})
    return (
        <>
            {posts.map(post => (
                <>
                    <div className='px-8 py-10 flex flex-col border-b border-gray-300 mx-5'>
                        <span className='mb-3'>Just Now</span>
                        <span className='font-bold mb-3'>{post.title}</span>
                        <span className='line-clamp-3'>{post.content}</span>
                    </div>
                </>
            ))
            }

        </>
    );
};

export default HomeTab;