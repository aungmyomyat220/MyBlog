import React from 'react';
import Sidebar from "@/app/profile/sidebar";
import contentPage from "@/app/profile/contentPage";
import ContentPage from "@/app/profile/contentPage";
import Home from "@/app/Home/page";
import HomeTab from "@/app/profile/HomeTab";
const Page = () => {
    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full flex'>
                    <div className='w-1/3 h-screen border-r border-gray-300'>
                        <Sidebar/>
                    </div>
                    <div className='w-2/3'>
                        <ContentPage/>
                        <HomeTab/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;