'use client'
import React from 'react';
import Sidebar from "@/app/profile/sidebar";
import isAuthenticated  from '../auth/authenticate';
import ContentPage from "@/app/profile/contentPage";
import { useLayoutEffect } from 'react';
import { useRouter } from "next/navigation";
import Navbar from '../Home/navbar';

const Page = () => {
    const router = useRouter()
    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if(!isAuth){
          router.push("/")
        }else{
          router.push("/profile")
        }
      }, [])
    return (
        <>
            <div className='w-full h-screen'>
            <Navbar></Navbar>
                <div className='w-full flex'>
                    <div className='w-2/3 h-screen pl-32'>
                        <ContentPage/>
                    </div>
                    <div className='w-1/3 border-l-2 border-gray-300 ml-32'>
                        <Sidebar></Sidebar>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;