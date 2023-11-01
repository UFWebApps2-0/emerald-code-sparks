import React, { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';

const Discussion = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className='discussionBoard'>
      <h1>Discussion Board</h1>
      <NewPost addPost={addPost} />
      {posts.map((post, index) => (
        <Post key={index} text={post} />
      ))}
    </div>
  );
};

export default Discussion;
