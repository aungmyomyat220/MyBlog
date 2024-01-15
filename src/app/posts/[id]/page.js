"use client";
import React, {useEffect, useRef, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Dots from '../../../image/dots.png'
import Image from "next/image";
import Like from "../../../image/love.png";
import Love from "../../../image/heart.png";
import Comment from "../../../image/chat.png";
import {useDispatch, useSelector} from "react-redux";
import {setLoveReact} from "../../../../Global Redux/createSlice/postSlice";
import CommentSection from "@/app/posts/[id]/CommentSection";
import {getAllPostHook} from "../../../../hooks/getAllPostHook";
import { updatePostHook } from '../../../../hooks/updatePostHook'

const Post = () => {
    const {mutate:deletePost} = updatePostHook()
    const {id:postId} = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewerMode , setViewerMode] = useState(false)
    const [comment, setComment] = useState(false)
    const [showPostOption, setShowPostOption] = useState(false)
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.post);
    const ref = useRef()
    const router = useRouter()
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     const userData = sessionStorage["user"];
    //     if (userData) {
    //         setUser(JSON.parse(userData));
    //     }
    //     if (user && user._id !== id) {
    //         setViewerMode(true);
    //     } else if (user && user._id === id) {
    //         setViewerMode(false);
    //     }
    // }, [viewerMode]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setComment(false)
                setShowPostOption(false)
            }
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [ref]);

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const like = (postId) => {
        dispatch(setLoveReact(postId));
    };

    const handleLoveClick = () => {

    };

    const handleBothClick = () => {
        like(postId);
        handleLoveClick();
    };

    const openComment = () => {
        setComment(!comment)
    }

    const {
        data: posts, error, isLoading,
    } = getAllPostHook()

    if (isLoading) {
        return (<div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const filterArr = posts.filter((post) => {
        return post._id === postId;
    });
    const filterPost = filterArr[0];

    const deletePosts = async (Id) => {
        const updateCategory = "delFlag"
        const res = await deletePost({ Id, updateData: true,updateCategory });
    }
    console.log(viewerMode)

    const editPost = () => {

    }

    return <>
        {comment && <div ref={ref}>
            <CommentSection post={filterPost}></CommentSection>
        </div>}
        <div
            className={`flex flex-col items-center w-full h-[2000px] ${comment ? ' opacity-50 backdrop-brightness-50 ' : 'opacity-100'}`}>
            <div className="max-w-5xl w-full h-32 flex flex-col mt-10 px-5">
                <div>
                    <span className="text-3xl font-bold cursor-pointer" >My Blog</span>
                </div>
                <div className="text-6xl font-semibold mt-12 mb-5">
                    {filterPost.title}
                </div>
                <div className="font-bold flex my-6 ">
                    <div>
                        <Image src={filterPost.authorImage} alt="author" onClick={() => {
                            router.push(`/profile/${filterPost.authorId}`)
                        }} className="w-12 h-12 rounded-full cursor-pointer" width={0} height={0}/>
                    </div>
                    <div className="flex flex-col ml-3">
                            <span className="text-lg hover:underline cursor-pointer" onClick={() => {
                                router.push(`/profile/${filterPost.authorId}`)
                            }}>{filterPost.author}</span>
                        <span className="mt-1 text-sm font-medium">
              {new Date(filterPost.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "2-digit", day: "2-digit",
              })}
            </span>
                    </div>
                </div>
                <div className="border-y mb-7 py-4 pl-6 flex flex-row text-gray-500 text-sm justify-between">
                    <div className={'flex'}>
                        <div className="flex mr-2 cursor-pointer">
                            {postData.loveData[postId]?.isLoved ? <Image
                              src={Love}
                              alt="Like"
                              className="w-5 h-5 mr-2"
                              onClick={handleBothClick}
                            /> : <Image
                              src={Like}
                              alt="Like"
                              className="w-5 h-5 mr-2"
                              onClick={handleBothClick}
                              height={0}
                              width={0}
                            />}
                            <span>{postData.loveData[postId]?.loveCount}</span>
                        </div>
                        <div className="flex mr-5 cursor-pointer">
                            <Image src={Comment} alt="Like" className="w-6 h-6 mr-2" onClick={openComment} height={0}
                                   width={0}/>
                            <span>{filterPost.comments.length}</span>
                        </div>
                    </div>

                    {
                      viewerMode ? "" :
                    <div>
                        <Image src={Dots} alt={'dots'} height={20} width={20} className={'cursor-pointer'} ref={ref}
                               onClick={() => setShowPostOption(!showPostOption)}/>
                    </div>
                    }
                    <div
                      hidden={showPostOption? false : true}
                      id="dropdown"
                      className="z-10 absolute right-52 mt-7 w-32 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                    >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                            <li>
                                <a
                                  onClick={editPost}
                                  className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Edit Post
                                </a>
                            </li>
                            <li>
                                <a
                                  onClick={()=>deletePosts(filterPost._id)}
                                  className="flex text-red-500 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Delete Post
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {filterPost.image && <div className="flex justify-center">
                    <Image
                      src={filterPost.image}
                      alt="alt image"
                      className="md:h-fit cursor-pointer"
                      onClick={() => openImage(filterPost.image)}
                      height={0}
                      width={600}
                    />
                </div>}
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-full max-w-4xl flex flex-col mt-10">
            <span className="leading-7 tracking-normal">
              {filterPost.content}
            </span>
                    </div>
                </div>

                {selectedImage && <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                      className="absolute inset-0 bg-black opacity-75"
                        onClick={closeImage}
                    ></div>
                    <div className="z-50 p-2 bg-white rounded-lg shadow-lg">
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            className="w-full max-w-2xl h-96"
                            height={0}
                            width={0}
                        />
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
                            onClick={closeImage}
                        >
                            Close
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    </>;
};

export default Post;
