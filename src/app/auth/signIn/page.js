'use client'
import React, {useState} from 'react';
import router from "next/navigation";
import {getUser} from "../../../../api/getUser";
import {useQuery} from "@tanstack/react-query";

const SignIn= () => {
    // const [allow,setAllow] = useState(false)
    // const [checkType,setCheckType] = useState('user')
    // const [checkUser,setCheckUser] = useState({
    //     "userEmail" : "",
    //     "userPassword" : ""
    // })
    //
    // const {data :users} = useQuery({queryKey: ['getUserKey'], queryFn: getUser})
    // const usersData = users || [];
    // usersData.forEach((user) => {
    //     if (user.userEmail === checkUser.userEmail && user.password === checkUser.userPassword) {
    //         setAllow(prevAllow => !prevAllow);
    //         user.role==='author'?
    //             setCheckType('author') : ""
    //     }
    // });
    // console.table(usersData)
    // console.table(checkUser)
    //
    // const handleInputChange = (e) => {
    //     e.preventDefault()
    //     const { value, name } = e.target;
    //     setCheckUser((prevCheckUser) => ({
    //         ...prevCheckUser,
    //         [name]: value
    //     }));
    // };
    //
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     if (allow) {
    //         if (checkType === "author") {
    //             alert('success')
    //             router.push('/admin-dashboard');
    //         } else if(checkType === "user"){
    //             alert('success')
    //             router.push('/');
    //         }
    //     }
    // };
    return (
        <>
            <div className='flex flex-col w-full h-screen justify-center items-center'>
                <div className='w-full flex flex-col items-center'>
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">Login</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input type="text" name="userEmail" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Password</label>
                                <input type="password" name="userPassword" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                            </div>
                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;