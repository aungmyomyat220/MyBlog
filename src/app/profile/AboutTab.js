import React, {useState} from 'react';

const AboutTab = () => {
    return (
        <>
            <div className='px-8 py-10 mx-5'>
                <div className='bg-gray-200 h-96 flex flex-col justify-center items-center px-20 mt-14'>
                    <span className='font-bold text-xl'>Tell the world about yourself</span>
                    <span className='px-28 text-center my-5'>
                        Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.
                    </span>
                    <button className='border border-black px-4 py-1 rounded-full'>Get Started</button>
                </div>
            </div>
        </>
    );
};

export default AboutTab;