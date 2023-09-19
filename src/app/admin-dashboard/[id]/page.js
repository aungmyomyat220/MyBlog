"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import imagePicker from '../../../image/noun-image-1066765.png'
import {getDate} from "../../../../api/getDate";
import {createPost, getUser} from "../../../../api/api";
const Page = () => {
    const [showButton, setShowButton] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [showText, setShowText] = useState(false);
    const [postData, setPostData] = useState({
        title : "",
        content : "",
        date : "",
        author : "",
        image : null
    })
    const inputRef = useRef()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowButton(false);
                setShowText(false)
                setIsRotated(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        e.preventDefault()
        const { value, name,type } = e.target;
        const file = e.target.files? e.target.files[0]:null
        setPostData((prevPostData) => ({
            ...prevPostData,
            [name]: type === 'file' ? URL.createObjectURL(file): value,
            date : new Date(),
        }));
    };

    const postUpload = async () =>{
        await createPost(postData);
        alert("Post Uploaded");
    }

    const handleInputClick = () => {
        setShowButton(true);
    };

    const handleButtonClick = () => {
        setIsRotated(!isRotated);
        setShowText((prevShowText) => !prevShowText);
    };

    const buttonStyles = {
        transform: isRotated ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.4s ease', // Add a smooth transition effect
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
                            {showButton && (
                                <button className="rounded-full px-2 text-2xl border border-black" style={buttonStyles}
                                        onClick={handleButtonClick}>+</button>
                            )}
                            {showText && (
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