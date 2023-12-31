import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPost } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../api/getDate";
import {getAllPostHook} from "../../../hooks/getAllPostHook";

const Foryou = ({searchKey,searchMode}) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const {
    data: posts = [],
    error,
    isLoading,
  } = getAllPostHook()
  posts.sort((a, b) => {
    const timeDifferenceA = new Date() - new Date(a.date);
    const timeDifferenceB = new Date() - new Date(b.date);
    return timeDifferenceA - timeDifferenceB;
  });

  if(searchMode){
    const res = posts.filter((post) => post.authorId !== user._id && post.title.toLowerCase().includes(searchKey.toLowerCase()));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setFilteredPosts(res);
    }, [searchKey, searchMode, user._id, posts]);
  }else{
    const res = posts.filter((post) => post.authorId !== user._id);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setFilteredPosts(res);
    }, [searchKey, searchMode, user._id, posts]);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleClick = (postId) => {
    router.push(`/posts/${postId}`);
  };

  const HighlightedTitle = ({ title, searchKey }) => {
    if (!searchKey) {
      return <span className="font-bold mb-3 text-2xl">{title}</span>;
    }

    const index = title.toLowerCase().indexOf(searchKey.toLowerCase());

    if (index === -1) {
      return <span className="font-bold mb-3 text-2xl">{title}</span>;
    }

    return (
        <span className="font-bold mb-3 text-2xl">
      {title.substring(0, index)}
          <span className="bg-gradient-to-r from-green-200 to-green-500">{title.substring(index, index + searchKey.length)}</span>
          {title.substring(index + searchKey.length)}
    </span>
    );
  };

  return (
    <div className="no-scrollbar">
      {(user ? filteredPosts : posts).map((post) => (
        <div
          className="grid grid-cols-5 border-b border-gray-300 mt-8 cursor-pointer"
          key={post._id}
        >
          <div className="flex flex-col mx-5 col-span-4">
            <div className="flex">
              <span
                className="hover:underline"
                onClick={() => router.push(`/profile/${post.authorId}`)}
              >
                {post.author}
              </span>
              <span>・</span>
              <span className="mb-3 text-gray-500">
                {formatDate(post.date)}
              </span>
            </div>
            <span
              className={`font-bold mb-3 text-2xl `}
              onClick={() => {
                handleClick(post._id);
              }}
            >
              <HighlightedTitle title={post.title} searchKey={searchKey} />
            </span>
            <span
              className="line-clamp-3 mb-8"
              onClick={() => {
                handleClick(post._id);
              }}
            >
              {post.content}...
            </span>
          </div>
          <div className="mt-10">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="rounded ml-7 w-24 mb-8 h-24 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  handleClick(post._id);
                }}
              ></img>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Foryou;
