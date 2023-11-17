import React, { useState } from 'react';

const Like = (props) => {
    const inital_like_count = props.like_count || 0;
    const [like_count, set_like_count] = useState(inital_like_count);
    const [liked, set_liked] = useState(false);
    const [heart, setHeart] = useState(<i className='fa fa-heart' />);

    function like_feature(e) {
        e.stopPropagation();

        if (!liked) {
            set_like_count(like_count + 1);
            setHeart(<i style={{ color: "red" }} className='fa fa-heart' />);
        } else {
            set_like_count(like_count - 1);
            setHeart(<i className='fa fa-heart' />);
        }
        set_liked(!liked); // Toggle the liked state
    }

    return (
        <>
            <button className="like-button" onClick={(e) => { like_feature(e) }}>
                {heart}
            </button>
            <p>Likes: {like_count}</p>
        </>
    );
}

export default Like;