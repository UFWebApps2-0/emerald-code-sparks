import React, { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';

const Discussion = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <>
      <MentorSubHeader title='Discussion Board' />
      <div
        style={{
          margin: '6vh auto 5vh auto',
          padding: '5vh 5vw',
          width: '80vw',
          height: 'auto',
          background: 'rgb(233, 233, 233)',
          borderRadius: '5px',
          border: '2px solid #5BABDE',
        }}
        className='discussionBoard'
      >
        <NewPost addPost={addPost} />
        {posts.map((post, index) => (
          <Post key={index} text={post} />
        ))}
      </div>
    </>
  );
};

export default Discussion;
