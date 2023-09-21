"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import imagePicker from '../../../image/noun-image-1066765.png'
import {
    setTitle,
    setContent,
    setImage,
    setShowButton,
    setIsRotated,
    setShowText,
    setDate
} from '../../../../Global Redux/createSlice/postSlice';
import {createPost} from "../../../../api/api";
import {useDispatch, useSelector} from "react-redux";
const Page = () => {
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.post);

    const inputRef = useRef()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                dispatch(setShowButton(false))
                dispatch(setShowText(false))
                dispatch(setIsRotated(false))
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { value, type } = e.target;
        const file = e.target.files ? e.target.files[0] : null;
        if (type === 'file') {
            dispatch(setImage(URL.createObjectURL(file)));
        } else {
            dispatch(setTitle(value));
            dispatch(setContent(value))
        }
        dispatch(setDate(new Date()));
    };

    const postUpload = async () =>{
        await createPost(postData);
        alert("Post Uploaded");
    }

    const handleInputClick = () => {
        dispatch(setShowButton(true))
    };

    const handleButtonClick = () => {
        dispatch(setIsRotated(!postData.isRotated))
        dispatch(setShowText(!postData.showText))
    };

    const buttonStyles = {
        transform: postData.isRotated? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s ease', // Add a smooth transition effect
    };

    const fileInputRef = useRef(null);
    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="flex flex-col w-full h-screen items-center mt-10">
                <div className="w-full flex flex-col max-w-7xl justify-center items-center">
                    <div className="w-full flex justify-between">
                        <span className="font-bold text-5xl">My Blog</span>
                        <div>
                            <button className="bg-green-600 text-white rounded-full px-3 py-1 mr-3" onClick={postUpload}>Publish</button>
                        </div>
                    </div>
                    <div className="max-w-4xl w-full mt-16 flex flex-col font-serif">
                            <input
                                className="hover:border-transparent focus:border-transparent outline-none px-4 text-5xl"
                                placeholder="Title" name="title" onChange={handleInputChange}
                            />

                        {postData.image?
                            <div className="flex justify-center my-10" hidden={true}>
                                <Image src={postData.image} alt="pp" className="h-80" width={500} height={150}/>
                            </div>
                            :
                            ""
                        }

                        <div ref={inputRef} className="mt-5 flex">
                            <div>
                            {postData.showButton && (
                                <button className="rounded-full px-2 text-2xl border border-black" style={buttonStyles}
                                        onClick={handleButtonClick}>+</button>
                            )}
                            {postData.showText && (
                                <>
                                      <span className="text-lg absolute bg-white ml-4 -mt-2 w-full">
                                        <Image
                                            src={imagePicker}
                                            alt="picture"
                                            className="w-14 h-12 rounded-full"
                                            onClick={openFilePicker}
                                            name = "image"
                                        />
                                      </span>
                                        {/* Hidden file input */}
                                        <input
                                            name="image"
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleInputChange}
                                        />
                                </>
                            )}
                            </div>
                                <textarea
                                    className="hover:border-transparent focus:border-transparent outline-none px-4 text-xl"
                                    placeholder="Tell Your Story"
                                    name="content"
                                    onClick={handleInputClick}
                                    onChange={handleInputChange}
                                    rows={100}
                                    cols={90}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;