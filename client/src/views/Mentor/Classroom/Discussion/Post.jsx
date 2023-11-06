import React, { useState, useEffect } from 'react';

import { getPost, addReply, createPost } from '../../../../Utils/requests';
import { message, Tag } from 'antd';

const Post = ({ postId }) => {
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState(false);
  const [replyText, setreplyText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPost(postId);
      if (res.data) {
        const post = res.data;
        setPost(post);
        setReplies([...post.Replies]);
      } else {
        message.error(res.err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (replyText != '') {
      const addData = async () => {
        const res = await createPost(replyText, 'John Doe');
        if (res.data) {
          setReplies([...replies, res.data]);
          setreplyText('');
          setReply(false);
          addReply(postId, replies, res.data);
        } else {
          message.error(res.err);
        }
      };
      addData();
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p
          style={{
            padding: '20px',
            fontSize: '1.2em',
            textAlign: 'left',
            display: 'inline - block',
          }}
        >
          {post.Text}
        </p>
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
          onClick={(event) => {
            setReply(!reply);
          }}
        >
          Reply
        </button>
      </div>
      <>
        {reply ? (
          <form onSubmit={handleSubmit}>
            <textarea
              style={{
                width: '40vw',
              }}
              placeholder='Post'
              value={replyText}
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
        ) : null}
      </>
      {replies.map((post, index) => (
        <p
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '40px',
            fontSize: '1.2em',
            textAlign: 'left',
          }}
        >
          {post.Text}
        </p>
      ))}
    </div>
  );
};

export default Post;
