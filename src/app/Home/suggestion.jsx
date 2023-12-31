import React, { useState, useEffect } from "react";
import { getPost } from "../../../api/api";
import Image from "next/image";
import fire from "../../image/fire.png";
import { useRouter } from "next/navigation";
import Follow from "./follow"
import {getAllUsersHook} from "../../../hooks/getAllUsersHook";

const Suggestion = () => {
  const [topThreePosts, setTopThreePosts] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const { data: users = [] } = getAllUsersHook()

  const filteredUsers = users.filter(
    (filterUser) => filterUser._id !== user._id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPost();
        posts.sort((a, b) => b.like - a.like);
        const topThree = posts.slice(0, 3);
        setTopThreePosts(topThree);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  const follow = (followUserId) => {
    alert("Success Follow")
    const followers = {
      "followerId" : []
    }
    followers.followerId.push(followUserId)
    Follow(followers,user._id)
  }

  return (
    <div>
      <div className="flex items-baseline">
        <span className="text-lg font-medium mr-2">Top Hits</span>
        <Image src={fire} height={20} width={20} alt='fire'></Image>
      </div>
      <div>
        {topThreePosts.map((post) => (
          <div className="flex flex-col my-6" key={post._id}>
            <div className="flex items-center">
              <span key={post._id}>
                <Image
                  src={post.authorImage}
                  width={20}
                  height={20}
                  alt="Author Image"
                  className="rounded-full cursor-pointer mr-3"
                />
              </span>
              <span className="text-sm font-medium cursor-pointer">
                {post.author}
              </span>
            </div>
            <span className="text-md font-bold mt-1 cursor-pointer" onClick={()=>{router.push(`/posts/${post._id}`)}}>
              {post.title}
            </span>
          </div>
        ))}
      </div>

       {/*Follower List*/}
      <div className="mt-14">
        <span className="font-medium text-lg">Who to Follow</span>
        {filteredUsers.map((user) => {
          return (
            <div className="h-20 flex mt-3" key={user._id}>
              <span>
                <Image
                  src={user.image}
                  alt={user.userName}
                  className="rounded-full w-9 h-9 cursor-pointer"
                  onClick={()=> router.push(`/profile/${user._id}`)}
                  height={0}
                  width={0}
                ></Image>
              </span>
              <div className="px-3 flex flex-col">
                <span className="font-bold hover:underline cursor-pointer" onClick={()=> router.push(`/profile/${user._id}`)}>{user.userName}</span>
                <span className="text-left text-sm text-gray-500">
                  .net C# 10years experience developer
                </span>
              </div>
              <span>
                <button className="border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white" onClick={()=>{follow(user._id)}}>
                  Follow
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestion;
