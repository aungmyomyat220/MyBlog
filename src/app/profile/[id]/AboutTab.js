import React, {useEffect, useState} from 'react';

const AboutTab = () => {
    const [viewerMode , setViewerMode] = useState(false)
    const [user, setUser] = useState({});
    useEffect(() => {
        const userData = sessionStorage["user"];
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    console.log(user)
    return (
        <>
            <div className='px-8 py-8 mx-5'>
                {
                    viewerMode ?
                        <div className='bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14'>
                            <span className='font-bold text-xl'>Viewer Mode</span>
                            <span className='px-28 text-center my-5'>
                                Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.
                            </span>
                            <button className='border border-black px-4 py-1 rounded-full'>Get Started</button>
                        </div>
                        :
                        <div className='bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14'>
                            <span className='font-bold text-xl'>Tell the world about yourself</span>
                            <span className='px-28 text-center my-5'>
                                Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.
                            </span>
                            <button className='border border-black px-4 py-1 rounded-full'>Get Started</button>
                        </div>
                }
            </div>
        </>
    );
};

export default AboutTab;