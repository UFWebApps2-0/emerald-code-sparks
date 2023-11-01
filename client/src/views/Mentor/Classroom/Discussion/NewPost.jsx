import React, { useState } from 'react';

const NewPost = ({ addPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    if (text != '') {
      event.preventDefault();
      addPost(text);
      setText('');
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder='Post' value={text} onChange={handleChange} />
      <button type='submit'>Post</button>
    </form>
  );
};

export default NewPost;
