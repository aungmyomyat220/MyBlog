import React, {useEffect} from 'react';
import Image from "next/image";
import Author1 from "@/image/joe.jpeg";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getPost} from "../../../api/api";
const EachPost = () => {

    const router = useRouter()
    useEffect(() => {
        router.prefetch('/posts');
    }, [router]);

    const {data :posts, error, isLoading} = useQuery({queryKey: ['get'], queryFn: getPost})

    if (isLoading) {
        return <div className='flex flex-col w-full h-screen justify-center items-center'>
            <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></span>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (

        <div className="textColor">
        <div className='md:grid md:grid-cols-2 mb-10'>
            {posts.map((post, index) => (
                <div key={index} className='mt-8 md:mr-4 mb-5'>
                    <img
                        src={post.image}
                        alt=''
                        className='h-52 mb-2 px-3 cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => router.push(`/posts/${post._id}`)}
                    />
                    <div className='px-4 flex flex-col sm:mt-3'>
                <span
                    className='text-2xl font-semibold mb-3 hover:underline'
                    onClick={() => router.push(`/posts/${post._id}`)}
                >
                    {post.title}
                </span>
                        <span>{post.date}</span>
                    </div>
                    <div className='px-4 mt-5 flex flex-col'>
                <span>
                    {post.content.split(' ').length > 100
                        ? post.content.split(' ').slice(0, 59).join(' ') + '......'
                        : post.content}
                </span>
                        <div className='mt-3 flex'>
                            <Image src={Author1} alt='' className='w-12 h-12 rounded-full'></Image>
                            <span className='font-bold text-lg ml-2 mt-2'>{post.author}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default EachPost;