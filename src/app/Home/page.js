"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EachPost from "./eachPost";
import { getPost } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import NavBar from './navbar'

export default function Home() {
  const router = useRouter();
  const {
    data: posts =[],
    error,
    isLoading,
  } = useQuery({ queryKey: ["get"], queryFn: getPost });
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {posts.length > 0 && (
        <div className="flex flex-col w-full justify-center items-center">
          <NavBar></NavBar>
          <div className="max-w-5xl w-full">
            <div className="w-full px-4 mt-12">
              <img
                src={posts[0].image}
                alt=""
                className="h-52 md:h-fit cursor-pointer"
                onClick={() => router.push(`/posts/${posts[0]._id}`)}
              />
            </div>
            <div className="sm:grid sm:grid-cols-2 mt-8">
              <div className="px-4 flex flex-col sm:mt-3">
                <span
                  className="text-2xl font-semibold mb-3 hover:underline"
                  onClick={() => router.push(`/posts/${posts[0]._id}`)}
                >
                  {posts[0].title}
                </span>
                <span>{new Date(posts[0].date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}</span>
                <span></span>
              </div>
              <div className="px-4 mt-5 flex flex-col">
                <span className="">
                  {posts[0].content.split(" ").length > 100 &&
                    posts[0].content.split(" ").slice(0, 59).join(" ") +
                      "......."}
                </span>

                <div className="mt-2 flex">
                  <Image src={posts[0].authorImage} alt="" className="w-12 h-12 rounded-full" width={0} height={0}></Image>
                  <span className="font-bold text-lg ml-2 mt-2">
                    {posts[0].author}
                  </span>
                </div>
              </div>
            </div>

            {/*More Stories*/}
            <div className="flex flex-col items-start mt-14 px-3">
              <span className="text-4xl font-bold mb-5">More Stories</span>
            </div>

            <EachPost />

            {/*Footer*/}
            <div className="bg-gray-200 flex flex-col  md:grid md:grid-cols-6 justify-center items-center text-center px-3 sm:px-2 py-20">
              <span className="font-bold text-3xl col-span-3 mr-3">
                Statically Generated with Next.js.
              </span>
              <button className="bg-black px-10 py-3 sm:mx-10 border col-span-2 text-white my-8 font-medium hover:bg-white hover:text-black duration-300 hover:border-black">
                <a href="https://nextjs.org/">Read Documentation</a>
              </button>
              <span className="font-bold">
                <a href="https://github.com/aungmyomyat4980/BlogFridayTest.git">
                  View on GitHub
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
