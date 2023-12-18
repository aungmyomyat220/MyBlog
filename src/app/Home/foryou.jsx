import React from 'react';
import { useRouter } from "next/navigation";
import { getPost } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import {formatDate} from "../../../api/getDate";

const Foryou = () => {
    const router = useRouter();
    const {
        data: posts =[],
        error,
        isLoading,
    } = useQuery({ queryKey: ["get"], queryFn: getPost });
    if (isLoading) {
        return (
            <div className="flex flex-col w-full h-screen justify-center items-center">
        <div class="cube-loader">
          <div class="cube cube1"></div>
          <div class="cube cube2"></div>
          <div class="cube cube3"></div>
          <div class="cube cube4"></div>
        </div>
      </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className='no-scrollbar'>
            {
                posts.map(post => (
                    <div className='grid grid-cols-5 border-b border-gray-300 mt-8' key={post._id}>
                        <div className='flex flex-col mx-5 col-span-4'>
                            <div className='flex'>
                                <span>{post.author}</span>
                                <span>・</span>
                                <span className='mb-3 text-gray-500'>{formatDate(post.date)}</span>
                            </div>
                            <span className='font-bold mb-3 text-2xl'>{post.title}</span>
                            <span className='line-clamp-3 mb-8'>{post.content}...</span>
                        </div>
                        <div className='mt-10'>
                            {
                                post.image && <img src={post.image} alt={post.title} className='rounded ml-7 w-24 h-24 cursor-pointer hover:scale-105 transition-transform'></img>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Foryou;