'use client'
import React from 'react';
import Sidebar from "@/app/profile/sidebar";
import contentPage from "@/app/profile/contentPage";
import ContentPage from "@/app/profile/contentPage";

const Page = () => {
    return (
        <>
            <div className='w-full h-screen'>
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