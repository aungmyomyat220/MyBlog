'use client'
import React, {useState} from 'react';
import { useQuery } from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {getPost} from "../../../../api/api";

const Post = () => {
    const { id } = useParams(); // Call useParams unconditionally
    // const postId = Number(id);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const { data: posts, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: getPost })

    if (isLoading) {
        return <div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const filterArr = posts.filter((post) =>{
        return post._id === id
    })

    const filterPost = filterArr[0]
    console.log("filterPost => " + filterPost)
    return (
        <div className='flex flex-col items-center w-full h-screen'>
            <div className='max-w-5xl w-full h-32 flex flex-col mt-10 px-5'>
                <div>
                    <span className='text-3xl font-bold'>Blog.</span>
                </div>
                <div className='text-6xl font-semibold mt-12 mb-5'>
                    {filterPost.title}
                </div>
                <div className='mb-8 font-bold'>
                    {filterPost.author}
                </div>
                <div>
                    {/*<div key={index} className="relative cursor-pointer" >*/}
                    {/*    <img src={filterPost.image} alt={`Image ${index}`} className='h-52 md:h-fit cursor-pointer' />*/}
                    {/*</div>*/}
                    <img
                        src={filterPost.image}
                        alt=''
                        className='h-52 md:h-fit cursor-pointer'
                        onClick={() => openImage(filterPost.image)}
                    />
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='w-full max-w-2xl flex flex-col'>
                        <span className='my-6'>{filterPost.date}</span>
                        <span className='leading-7 tracking-normal'>{filterPost.content}</span>
                    </div>
                </div>

                {selectedImage && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-75" onClick={closeImage}></div>
                        <div className="z-50 p-4 bg-white rounded-lg shadow-lg">
                            <img src={selectedImage} alt="Selected Image" className="w-full max-w-2xl h-96" />
                            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900" onClick={closeImage}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/*Footer*/}
                <div className='bg-gray-200 flex flex-col mt-10  md:grid md:grid-cols-6 justify-center items-center text-center px-3 sm:px-2 py-20'>
                    <span className='font-bold text-3xl col-span-3 mr-3'>Statically Generated with Next.js.</span>
                    <button className='bg-black px-10 py-3 sm:mx-10 border col-span-2 text-white my-8 font-medium hover:bg-white hover:text-black duration-300 hover:border-black'><a href="https://nextjs.org/">Read Documentation</a></button>
                    <span className='font-bold'><a href='https://github.com/aungmyomyat4980/BlogFridayTest.git'>View on GitHub</a></span>
                </div>
            </div>
        </div>
    )
};

export default Post;
