import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Profile from '../../image/joe.jpeg'
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../../api/api";
const Sidebar = () => {
    const {data :users = []} = useQuery({queryKey: ['getUserInSideBar'], queryFn: getUser})
    const [loginUser, setLoginUser] = useState(null);
    const [loginUserId, setLoginUserId] = useState(sessionStorage.getItem("userId"));

    // Update loginUserId when it changes in session storage
    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId !== loginUserId) {
            setLoginUserId(storedUserId);
        }
    }, [loginUserId]);

    // Fetch and update loginUser when loginUserId changes
    useEffect(() => {
        if (loginUserId) {
            const user = users.find(user => user._id === loginUserId);
            console.log(user);
            setLoginUser(user);
        }
    }, [loginUserId, users]);

    return (
        <>
            <div className='pt-7 ml-5 flex flex-col items-center'>
                <Image src={Profile} alt='profile' className='rounded-full'/>
                {loginUser && <span className='text-black font-bold text-xl my-5'>{loginUser.userName}</span>}
                <span>
                    <button className='px-3 py-2 bg-blue-600
                     text-white rounded-xl'>Edit Profile</button>
                </span>
            </div>
        </>
    );
};

export default Sidebar;