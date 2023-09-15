'use client'
import React, { useState } from 'react';
import HomeTab from "@/app/profile/HomeTab";
import AboutTab from "@/app/profile/AboutTab";
const ContentPage = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <div className='text-black p-8'>
                <span className='text-4xl font-bold'>My Blog</span>
            </div>
            <div className='text-lg text-black mt-3 grid grid-cols-2'>
                <span
                    className={`px-5 border-b-2 py-3 cursor-pointer ${
                        activeTab === 'Home' ? 'border-black' : 'border-gray-300'
                    } text-center ${activeTab === 'Home' ? 'font-bold' : ''}`}
                    onClick={() => handleTabClick('Home')}
                >
                    Home
                </span>
                <span
                    className={`border-b-2 py-3 cursor-pointer ${
                        activeTab === 'About' ? 'border-black' : 'border-gray-300'
                    } text-center ${activeTab === 'About' ? 'font-bold' : ''}`}
                    onClick={() => handleTabClick('About')}
                >
                    About
                </span>
            </div>
            {
                activeTab === "Home" ?
                    <HomeTab/> : <AboutTab/>
            }

        </>
    );
};

export default ContentPage;
