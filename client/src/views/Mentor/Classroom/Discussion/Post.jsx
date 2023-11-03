import React, { useState } from 'react';

const Post = ({ text }) => {
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState(false);
  const [replyText, setreplyText] = useState('');

  const handleSubmit = (event) => {
    if (replyText != '') {
      event.preventDefault();
      setReplies([...replies, replyText]);
      setreplyText('');
      setReply(false);
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    setreplyText(event.target.value);
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
      <p
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          fontSize: '1.2em',
          textAlign: 'left',
        }}
      >
        {text}
      </p>
      <button
        style={{
          display: 'flow',
          flexDirection: 'row',
          float: 'right',
          width: 'auto',
          height: '3vh',
          border: 'none',
          color: '#414141',
          background: '#F3D250',
          transition: '0.25s',
          cursor: 'pointer',
          borderRadius: '30px',
        }}
        onClick={(event) => {
          setReply(!reply);
        }}
      >
        Reply
      </button>
      <>
        {reply ? (
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder='Post'
              value={replyText}
              onChange={handleChange}
            />
            <button type='submit'>Post</button>
          </form>
        ) : null}
      </>
      {replies.map((post, index) => (
        <p
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '40px',
            fontSize: '1.2em',
            textAlign: 'left',
          }}
        >
          {post}
        </p>
      ))}
    </div>
  );
};

export default Post;
