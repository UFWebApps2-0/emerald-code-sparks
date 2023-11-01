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
    <div>
      <p>{text}</p>
      <button
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
        <p key={index}>{post}</p>
      ))}
    </div>
  );
};

export default Post;
