import React from 'react';
import Image from "next/image";
import Profile from '../../image/joe.jpeg'
const Sidebar = () => {
    return (
        <>
            <div className='pt-7 ml-5 flex flex-col items-center'>
                <Image src={Profile} alt='profile' className='rounded-full'/>
                <span className='text-black font-bold text-xl my-5'>Aung Myo Myat</span>
                <span>
                    <button className='px-3 py-2 bg-blue-600
                     text-white rounded-xl'>Edit Profile</button>
                </span>
            </div>
        </>
    );
};

export default Sidebar;