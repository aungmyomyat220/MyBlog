import React from 'react';
import Header from "@/app/profile/header";
const Page = () => {
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-full h-screen flex flex-col items-center bg-black max-w-7xl">
                    <Header/>
                </div>
            </div>
        </>
    );
};

export default Page;