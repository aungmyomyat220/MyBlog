'use client'
import Image from 'next/image'
import JJLogo from '../../image/jj.png'
import {useRouter} from "next/navigation";
import EachPost from './eachPost'
import {getPost} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";

export default function Home() {
    const router = useRouter()
    const {data :posts, error, isLoading} = useQuery({queryKey: ['get'], queryFn: getPost})
    if (isLoading) {
        return <div className='flex flex-col w-full h-screen justify-center items-center'>
            <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></span>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleLoginClick = (e) => {
        e.preventDefault()
        const checkBtn = e.target.value
        checkBtn === "login"?
        router.push('/auth/signIn') :
            router.push('/auth/signUp')
    };

    return (
        <>
            {posts.length > 0 && (
                <div className='flex flex-col w-full justify-center items-center'>
                    <div className='max-w-5xl w-full'>
                        <div className='flex flex-col items-center mt-20 sm:flex-row sm:justify-between sm:pl-3'>
                            <span className='text-4xl font-bold'>My Blog</span>
                            <span className='px-6 mt-3 text-center'>
                                <button className='bg-gray-600 px-6 py-1 text-white rounded-md' value="login" onClick={handleLoginClick}>Login</button>
                                <button className='bg-gray-600 px-6 py-1 text-white rounded-md ml-3' value='signup' onClick={handleLoginClick}>SignUp</button>
                            </span>
                        </div>
                        <div className='w-full px-4 mt-12'>
                            <img
                                src={posts[0].image}
                                alt=''
                                className='h-52 md:h-fit cursor-pointer'
                                onClick={() => router.push(`/posts/${posts[0]._id}`)}
                            />
                        </div>
                        <div className='sm:grid sm:grid-cols-2 mt-8'>
                            <div className='px-4 flex flex-col sm:mt-3'>
                      <span className='text-2xl font-semibold mb-3 hover:underline'
                            onClick={() => router.push(`/posts/${posts[0]._id}`)}>
                        {posts[0].title}
                      </span>
                                <span>{posts[0].date}</span>
                                <span></span>
                            </div>
                            <div className='px-4 mt-5 flex flex-col'>
                      <span className=''>
                        {posts[0].content.split(' ').length > 100 &&
                            posts[0].content.split(' ').slice(0, 59).join(' ') + '.......'
                        }
                      </span>

                                <div className="mt-2 flex">
                                    <Image src={JJLogo} alt='' className='w-12 h-12'></Image>
                                    <span className='font-bold text-lg ml-2 mt-2'>{posts[0].author}</span>
                                </div>
                            </div>
                        </div>

                        {/*More Stories*/}
                        <div className='flex flex-col items-start mt-14 px-3'>
                            <span className='text-4xl font-bold mb-5'>More Stories</span>
                        </div>

                        <EachPost/>

                        {/*Footer*/}
                        <div
                            className='bg-gray-200 flex flex-col  md:grid md:grid-cols-6 justify-center items-center text-center px-3 sm:px-2 py-20'>
                            <span
                                className='font-bold text-3xl col-span-3 mr-3'>Statically Generated with Next.js.</span>
                            <button
                                className='bg-black px-10 py-3 sm:mx-10 border col-span-2 text-white my-8 font-medium hover:bg-white hover:text-black duration-300 hover:border-black'>
                                <a href="https://nextjs.org/">Read Documentation</a></button>
                            <span className='font-bold'><a href='https://github.com/aungmyomyat4980/BlogFridayTest.git'>View on GitHub</a></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
