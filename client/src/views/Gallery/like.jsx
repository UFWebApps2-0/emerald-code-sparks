import React, { useState } from 'react';
import likeImage from './like.png';
import unlikedImage from './unlike.png';

const Like = () => {
    const [like_count, set_like_count] = useState(0);
    const [liked, set_liked] = useState(false);

    function like_feature(e) {
        e.stopPropagation();

        if (!liked) {
            set_like_count(like_count + 1);
        } else {
            set_like_count(like_count - 1);
        }
        set_liked(!liked); // Toggle the liked state
    }

    return (
        <>
            <button className="like-button" onClick={(e) => { like_feature(e) }}>
                <img src={liked ? likeImage : unlikedImage} alt="Like" />
            </button>
            <p>Like count:{like_count}</p>
        </>
    );
}

export default Like;