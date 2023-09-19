"use client"
import React, {useState} from 'react';
import { getUser} from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const [checkUser,setCheckUser] = useState({
        email : "",
        password : ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckUser((prevCheckUser) => ({
            ...prevCheckUser,
            [name]: value,
        }));
    };

    const { data: users} = useQuery({ queryKey: ['SignInUser'], queryFn: getUser })

    const handleClick = (e) => {
        e.preventDefault()
        const foundUser = users.find((user) => user.email === checkUser.email && user.password === checkUser.password);
        console.log(`SignIn page => ${foundUser.userName}`)
        if (foundUser) {
            sessionStorage.setItem('userId', foundUser._id);
            foundUser.role === "author" ? router.push(`/profile`) : router.push("/Home")
        } else {
            alert("Your Account Does Not Exist. Register First")
        }
    };


    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" name="email" required
                               onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" name="password" required
                               onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit" onClick={handleClick}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
                </form>
            </div>
            </div>
        </>
    );
};

export default Page;