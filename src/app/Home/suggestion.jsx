import React, { useState, useEffect } from "react";
import { getPost, getUser } from "../../../api/api";
import Image from "next/image";
import fire from "../../image/fire.png";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  const { data: users = [] } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUser,
  });

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

  return (
    <div>
      <div className="flex items-baseline">
        <span className="text-lg font-medium mr-2">Top Hits</span>
        <Image src={fire} height={20} width={20} alt='fire'></Image>
      </div>
      <div>
        {topThreePosts.map((post) => (
          <div className="flex flex-col my-6">
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

      {/* Follower List */}
      <div className="mt-14">
        <span className="font-medium text-lg">Who to Follow</span>
        {filteredUsers.map((user) => {
          return (
            <div className="h-20 flex mt-3">
              <span>
                <img
                  src={user.image}
                  alt={user.userName}
                  className="rounded-full w-9 h-9 cursor-pointer"
                  onClick={()=> router.push(`/profile/${user._id}`)}
                ></img>
              </span>
              <div className="px-3 flex flex-col">
                <span className="font-bold hover:underline cursor-pointer" onClick={()=> router.push(`/profile/${user._id}`)}>{user.userName}</span>
                <span className="text-left text-sm text-gray-500">
                  .net C# 10years experience developer
                </span>
              </div>
              <span>
                <button className="border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white">
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