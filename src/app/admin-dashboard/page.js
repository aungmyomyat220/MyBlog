'use client'
import React, {useState} from 'react';
import Image from "next/image";
import Author from '../../image/joe.jpeg'
import {createPost} from "../../../api/api";
import {getDate} from "../../../api/getDate";
const adminDashboard = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [postData, setPostData] = useState({
        title : "",
        content : "",
        date : getDate(),
        author : "",
        image : ""
    })

    const handleInputChange = (e) => {
        e.preventDefault()
        const { value, name } = e.target;
        setPostData((prevPostData) => ({
            ...prevPostData,
            [name]: value
        }));
    };
    const postUpload = async (e) =>{
        await createPost(postData);
        setPostData({
            title: "",
            content: "",
        });
        alert("Post Uploaded");
    }
    return (
        <>
           <div className='flex flex-col justify-center items-center w-full h-screen text-white'>
               <div className='w-full flex flex-col items-center max-w-xl border  rounded border-black bg-gray-600'>
                   <span className='font-bold text-lg py-4 border-b border-white w-full text-center'>Create Post</span>
                   <div className='pt-8 pb-5 flex w-full px-5'>
                       <Image src={Author} alt='author' className='w-12 h-12 rounded-full'/>
                       <span className='text-lg font-medium ml-3 mt-2'>Admin</span>
                   </div>
                   <div className='flex flex-col'>
                       <label className='font-bold'>Title</label>
                       <textarea onChange={handleInputChange} name="title" className='bg-gray-600 border rounded-lg w-96 p-3 placeholder:text-white mb-6 ' placeholder="What's on your mind?"></textarea>
                   </div>
                   <div className='flex flex-col mt-3'>
                       <label className='font-bold'>Content</label>
                       <textarea onChange={handleInputChange} name="content" className='bg-gray-600 border rounded-lg w-96 p-3 placeholder:text-white mb-6 ' placeholder="What's on your mind?"></textarea>
                   </div>
                   <div>
                       <button className='bg-blue-700 px-44 py-1 rounded-md mb-4' onClick={postUpload}>Post</button>
                   </div>
               </div>
           </div>
        </>
    );
};

export default adminDashboard ;