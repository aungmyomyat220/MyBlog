import React, { useEffect, useState } from 'react';
import Image from "next/image";
import writepost from '../../image/write.png';
import { useRouter } from "next/navigation";
import { Router } from 'next/router';

const Sidebar = () => {
  const router = useRouter()
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = sessionStorage['user'];
    if (userData) {
      setUser(JSON.parse(userData));
    } 
  }, []);

  const uploadPost = () => {
    router.push(`admin-dashboard/${user._id}`);
  }

  return (
    <>
      <div className='pt-14 flex flex-col items-center'>
        <Image src={user.image} alt='profile' className='rounded-full' width={90} height={0}/>
        <span className='text-black font-bold text-xl my-5'>{user.userName || 'Guest'}</span>
        <div className='flex flex-row'>
          <button className='px-3 py-2 bg-blue-600 text-white rounded-xl'>Edit Profile</button>
          <button className='px-3 py-2 bg-green-500 flex text-white rounded-xl ml-4' onClick={uploadPost}><Image src={writepost} className='w-5 h-5 mr-2'></Image>Write Post</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
