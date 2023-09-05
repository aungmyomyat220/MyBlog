'use client'
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from "next/navigation";
import { createUser } from "../../../../api/api";
import Image from "next/image";
import ImagePicker from "@/image/plus.jpg";

const Page = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        "userName": "",
        "userEmail": "",
        "password": "",
        "confirmPassword": "",
        "role": "",
        "image" : ""
    });
    const [error, setError] = useState(""); // State to store the error message

    const fileInputRef = useRef(null);
    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        const { value, name,type,files } = e.target;
            setUser((prevUser) => ({
                ...prevUser,
                [name]: type === 'file' ? files : value,
            }))
    };

    const handleClick = async (e) => {
        e.preventDefault();
        // Check if any of the required fields are blank
        if (!user.userName || !user.userEmail || !user.password || !user.confirmPassword || !user.role) {
            setError("Please fill in all the required fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(user.userEmail)) {
            setError("Please enter a valid email address.");
            return;
        }
        // Check if the password and confirm password match
        if (user.password !== user.confirmPassword) {
            setError("Password and Confirm Password do not match.");
            return;
        }

        // If all validations pass, create the user
        try {
            await createUser(user);
            setUser({
                "userName": "",
                "userEmail": "",
                "password": "",
                "role": ""
            });
            setError("");
            router.push('/auth/signIn');
        } catch (error) {
            setError("An error occurred while creating the user."); // Handle API error
        }
    };

    useEffect(() => {
        router.prefetch('auth/signIn');
    }, [router]);

    return (
        <>
            <div className='flex flex-col w-full h-screen justify-center items-center'>
                <div className='w-full flex flex-col items-center'>
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
                        <h2 className="text-3xl font-semibold mb-4">Sign Up Here</h2>
                        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
                        <form>
                            <div className="my-5">
                                <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
                                <div onClick={openFilePicker} className='mt-2' >
                                    {user.image ? (
                                        <img src={user.image} alt="Selected" width="300" className="w-16 h-16 rounded-full" />
                                    ) : (
                                        <div>
                                            <Image src={ImagePicker} alt="ImagePicker" className="w-16 h-16"></Image>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Username</label>
                                <input type="text" name="userName" onChange={handleInputChange}
                                       className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Enter your Name" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input type="email" name="userEmail" onChange={handleInputChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Enter your eamil" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Password</label>
                                <input type="password" name="password" onChange={handleInputChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                                <input type="password" name="confirmPassword" onChange={handleInputChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Confirm your password" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-1">Role</label>
                                <input type="radio" value='author' name="role" onChange={handleInputChange} className="mr-2" required /><label className='mr-8'>Author</label>
                                <input type="radio" value='user' name="role" onChange={handleInputChange} className="mr-2" required /><label className='mr-8'>User</label>
                            </div>
                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200" onClick={handleClick}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
