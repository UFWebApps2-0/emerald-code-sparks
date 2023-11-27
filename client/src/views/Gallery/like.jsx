import React, { useState } from 'react';
import likeImage from './like.png';
import unlikedImage from './unlike.png';
import { updateLikeCount } from '../../Utils/requests';

const Like = (props) => {
    const inital_like_count = props.likeCount.like_count || 0;
    const [like_count, set_like_count] = useState(inital_like_count);
    const [liked, set_liked] = useState(false);

    const postId = props.likeCount.id
    
    function like_feature(e) {
        e.stopPropagation();

        if (!liked) {
            updateLikeCount(postId, like_count + 1);
        } else {
            updateLikeCount(postId, like_count - 1);
        }
        set_like_count(like_count + (liked ? -1 : 1)); // Increment or decrement the like count
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