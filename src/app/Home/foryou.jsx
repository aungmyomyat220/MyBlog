import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPost } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../api/getDate";

const Foryou = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

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
  } = useQuery({
    queryKey: ["get"],
    queryFn: getPost,
    refetchOnMount : true,
    refetchOnWindowFocus : true
  });

  const filteredPosts = posts.filter((post) => post.authorId !== user._id);

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
              className="font-bold mb-3 text-2xl"
              onClick={() => {
                handleClick(post._id);
              }}
            >
              {post.title}
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
                className="rounded ml-7 w-24 h-24 cursor-pointer hover:scale-105 transition-transform"
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
