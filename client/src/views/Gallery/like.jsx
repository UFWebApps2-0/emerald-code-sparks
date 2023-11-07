import react from 'react';
import React, { useState } from 'react';

const Like = () => {
    //let like_count = 0;
    const [like_count, set_like_count] = useState(0);
    const [liked, set_liked] = useState(false);

    function like_feature() {
        if (!liked) {
            set_like_count(like_count + 1);
            set_liked(true);
        }
        else {
            set_like_count(like_count - 1);
            set_liked(false);
        }
    }

    return (
        <>
        <button onClick = {() => {like_feature()}}>Like</button> 
        <p> Like count: {like_count} </p>
        </>
    );
}

export default Like;