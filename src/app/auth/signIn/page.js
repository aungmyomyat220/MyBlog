"use client"
import React, {useState} from 'react';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { Login } from "../../../../api/api";
const Page = () => {
    const router = useRouter()
    const [checkUser,setCheckUser] = useState({
        userEmail : "",
        password : ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckUser((prevCheckUser) => ({
            ...prevCheckUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Login(checkUser)
            if (response.statusCode === 200) {
                sessionStorage.setItem('user', JSON.stringify(response.user));
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1000,
                });
                router.push('/Home');
            }else if(response.statusCode === 401) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password',
                    showConfirmButton: true,
                    timer: null,
                });
            }
          } catch (error) {
            console.error('Error authenticating user', error);
          }
      };

    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" name="userEmail" required
                               onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" name="password" required
                               onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit" onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
            </div>
            </div>
        </>
    );
};

export default Page;