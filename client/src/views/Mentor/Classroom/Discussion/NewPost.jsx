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
    <div
      style={{
        width: '70vw',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.377)',
        borderRadius: '10px',
        margin: '20px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <textarea placeholder='Post' value={text} onChange={handleChange} />
        <button type='submit'>Post</button>
      </form>
    </div>
  );
};

export default NewPost;
