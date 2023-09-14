'use client'
import React from 'react';
import Image from "next/image";
import CoverImage from '../../image/anime-naruto-madara-uchiha-wallpaper-preview.jpg'
import ProfileImage from '../../image/joe.jpeg'
import Location from "../../image/social.png"
import Born from "../../image/birthday-cake.png"
import Calendar from "../../image/calendar.png"
const Header = () => {
    return (
        <div className='w-full max-w-6xl relative'>
            <div>
                <Image src={CoverImage} alt="coverphoto" className='w-full h-96' />
            </div>
            <div className='bg-black h-1/2 w-full text-white absolute bottom-0 left-0 px-5'>
                <div className="flex justify-between items-center">
                    <Image src={ProfileImage} alt="profile image" className='w-20 h-20 rounded-full'/>
                    <span className=' h-20 flex items-end'>
                        <button className='border border-white rounded-full px-3'>Edit profile</button>
                    </span>
                </div>

                <div className='mt-10 flex flex-col'>
                    <span className='font-bold text-2xl'>Aung Myo Myat</span>
                    <span className='mt-1 text-gray-400'>@AungMyoMyat12</span>
                    <span className='mt-3'>Just Wanna be for You</span>
                    <div className="mt-2 flex text-gray-400">
                        <span className='flex items-center'>
                            <Image src={Location} alt='location' className='w-5 h-5 mr-2'/>
                            <span className="mr-7">Myanmar</span>
                        </span>
                        <span className='flex items-center'>
                            <Image src={Born} alt='Born' className='w-7 h-7 mr-1'></Image>
                            <span>Born January 3,1999</span>
                        </span>
                    </div>
                    <div className='flex text-gray-400'>
                        <Image src={Calendar} alt='Born' className='w-7 h-7 mr-2'></Image>
                        <span>Joined February 2016</span>
                    </div>
                    <div className='mt-2'>
                        <span>23 <span className='text-gray-400'>Following</span></span>
                        <span className='ml-5'>7 <span className='text-gray-400'>Followers</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;