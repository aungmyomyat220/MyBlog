"use client";
import React, {useEffect, useRef, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import {useParams, useRouter} from "next/navigation";
import { getPost } from "../../../../api/api";
import Image from "next/image";
import Like from "../../../image/love.png";
import Love from "../../../image/heart.png";
import Comment from "../../../image/chat.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoveReact } from "../../../../Global Redux/createSlice/postSlice";
import CommentSection from "@/app/posts/[id]/CommentSection";

const Post = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment,setComment] = useState(false)
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post);
  const ref = useRef()
  const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setComment(false)
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
    console.log(postData);
  };

  const handleBothClick = () => {
    like(id);
    handleLoveClick();
  };

  const openComment = () => {
      setComment(!comment)
  }

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({ queryKey: ["posts"], queryFn: getPost });

  if (isLoading) {
    return (
      <div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const filterArr = posts.filter((post) => {
    return post._id === id;
  });
  const filterPost = filterArr[0];

  return (
      <>
      {comment &&
          <div ref={ref}>
              <CommentSection post={filterPost}></CommentSection>
          </div>
      }
        <div className={`flex flex-col items-center w-full h-[2000px] ${comment? ' opacity-50 backdrop-brightness-50 ' : 'opacity-100'}`}>
          <div className="max-w-5xl w-full h-32 flex flex-col mt-10 px-5">
        <div>
          <span className="text-3xl font-bold">My Blog</span>
        </div>
        <div className="text-6xl font-semibold mt-12 mb-5">
          {filterPost.title}
        </div>
        <div className="font-bold flex my-6 ">
          <div>
            <Image src={filterPost.authorImage} alt="author"  onClick={()=> {router.push(`/profile/${filterPost.authorId}`)}} className="w-12 h-12 rounded-full cursor-pointer" width={0} height={0} />
          </div>
          <div className="flex flex-col ml-3">
            <span className="text-lg hover:underline cursor-pointer" onClick={()=> {router.push(`/profile/${filterPost.authorId}`)}}>{filterPost.author}</span>
            <span className="mt-1 text-sm font-medium">
              {new Date(filterPost.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="border-y mb-7 py-4 pl-6 flex text-gray-500 text-sm">
          <div className="flex mr-5 cursor-pointer">
            {postData.loveData[id]?.isLoved ? (
              <Image
                src={Love}
                alt="Like"
                className="w-5 h-5 mr-2"
                onClick={handleBothClick}
              />
            ) : (
              <Image
                src={Like}
                alt="Like"
                className="w-5 h-5 mr-2"
                onClick={handleBothClick}
              />
            )}
            <span>{postData.loveData[id]?.loveCount}</span>
          </div>
          <div className="flex mr-5 cursor-pointer">
            <Image src={Comment} alt="Like" className="w-5 h-5 mr-2" onClick={openComment} />
            <span>{filterPost.comments.length}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={filterPost.image}
            alt=""
            className="md:h-fit cursor-pointer"
            onClick={() => openImage(filterPost.image)}
            height={0}
            width={600}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-4xl flex flex-col mt-10">
            <span className="leading-7 tracking-normal">
              {filterPost.content}
            </span>
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-75"
              onClick={closeImage}
            ></div>
            <div className="z-50 p-2 bg-white rounded-lg shadow-lg">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="w-full max-w-2xl h-96"
              />
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
                onClick={closeImage}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
        </div>
      </>
  );
};

export default Post;
