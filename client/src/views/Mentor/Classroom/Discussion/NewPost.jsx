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
        <textarea
          style={{
            width: '40vw',
          }}
          placeholder='Post'
          value={text}
          onChange={handleChange}
        />
        <button
          style={{
            width: 'auto',
            height: 'auto',
            border: 'none',
            color: '#414141',
            background: '#F3D250',
            transition: '0.25s',
            cursor: 'pointer',
            borderRadius: '30px',
            padding: '10px',
            margin: '20px',
            display: 'inline - block',
          }}
          type='submit'
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
