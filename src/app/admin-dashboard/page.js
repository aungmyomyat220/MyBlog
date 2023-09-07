'use client'
import React, {useRef, useState} from 'react';
import Image from "next/image";
import Author from '../../image/joe.jpeg'
import {createPost} from "../../../api/api";
import {getDate} from "../../../api/getDate";
import ImagePicker from "@/image/upload.png";
const adminDashboard = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [postData, setPostData] = useState({
        title : "",
        content : "",
        date : "",
        author : "",
        image : ""
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        const { value, name,type } = e.target;
        const file = e.target.files? e.target.files[0]:null
        setPostData((prevPostData) => ({
            ...prevPostData,
            [name]: type === 'file' ? URL.createObjectURL(file): value,
            date : getDate(),
        }));
    };
    const postUpload = async (e) =>{
        await createPost(postData);
        alert("Post Uploaded");
    }
    return (
        <>
            <div className='flex flex-col w-full h-screen justify-center items-center text-black'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <div className="p-8 rounded shadow-md w-full max-w-xl flex flex-col items-center">
                        <span className='font-bold text-2xl py-4 border-b border-black w-full text-center'>Create Post</span>
                        <div className='pt-8 pb-5 flex w-full px-5'>
                            <Image src={Author} alt='author' className='w-12 h-12 rounded-full'/>
                            <span className='text-lg font-medium ml-3 mt-2'>Admin</span>
                        </div>
                        <div className='flex flex-col'>
                            <div className="my-5">
                                <label className="block font-medium mb-1">Upload Image</label>
                                <div onClick={openFilePicker} className='mt-2' >
                                    {postData.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element

                                        <div className="p-10 flex justify-center items-center">
                                            <Image src={postData.image} alt="Selected" width="300" height={15} className="w-full h-32" />
                                        </div>
                                    ) : (
                                        <div>

                                            <div className="border border-dashed border-blue-900 p-10 flex justify-center items-center">
                                                <Image src={ImagePicker} alt="ImagePicker" className="w-6 h-6"></Image>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <label className='font-bold'>Title</label>
                            <textarea onChange={handleInputChange} name="title" className='border rounded-lg w-96 p-3 placeholder:text-white mb-6 ' placeholder="What's on your mind?"></textarea>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <label className='font-bold'>Content</label>
                            <textarea onChange={handleInputChange} name="content" className='border rounded-lg w-96 p-3 placeholder:text-white mb-6 ' placeholder="What's on your mind?"></textarea>
                        </div>
                        <div>
                            <button className='bg-blue-700 px-44 py-1 rounded-md mb-4 text-white' onClick={postUpload}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default adminDashboard ;