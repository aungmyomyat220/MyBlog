import React from 'react';
import Cross from '../../../image/cross.png'
import Image from "next/image";

const ViewComment = (props) => {
    const { updatedPost } = props
    return (
        <div className='no-scrollbar'>
            {updatedPost.comments.map(comment => {
                return (
                    <div key={comment._id}>
                        <div className={'flex mt-7'}>
                            <span>
                                <Image src={Cross} alt={'profile'} height={0} width={0} className={'rounded-full w-10 h-10'}/>
                            </span>
                            <div className={'flex flex-col text-sm ml-3'}>
                                <span>{comment.cName}</span>
                                <span className='text-gray-400'>{comment.cDate}</span>
                            </div>
                        </div>
                        <div className={'py-7 border-b'}>
                            {comment.cContent}
                        </div>

                    </div>
                )
            })}
        </div>
    );
};

export default ViewComment;