import React, { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';

const Discussion = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '5vh 5vw',
        width: '80vw',
        height: 'auto',
        background: 'rgb(233, 233, 233)',
        borderRadius: '5px',
        border: '2px solid #5BABDE',
      }}
      className='discussionBoard'
    >
      <h1
        style={{
          marginBottom: 0,
          float: 'left',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          height: 'auto',
          padding: '10px 5px',
          width: '34%',
          borderRadius: '80px',
          background: '#5BABDE',
          fontSize: '1.2em',
          top: '5vh',
          left: '-2vw',
          zIndex: 1,
        }}
      >
        Discussion Board
      </h1>
      <NewPost addPost={addPost} />
      {posts.map((post, index) => (
        <Post key={index} text={post} />
      ))}
    </div>
  );
};

export default Discussion;
