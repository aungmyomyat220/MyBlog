import React from 'react';

const Page = () => {
    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input type="text" id="username" name="username" required
                               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" name="password" required
                               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
                </form>
            </div>
            </div>
        </>
    );
};

export default Page;