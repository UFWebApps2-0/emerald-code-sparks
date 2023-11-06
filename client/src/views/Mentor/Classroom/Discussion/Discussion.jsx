import React, { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';

import { getClassroom, getDiscussion } from '../../../../Utils/requests';
import { message, Tag } from 'antd';

const Discussion = ({ classroomId }) => {
  const [classroom, setClassroom] = useState({});
  const [discussion, setDiscussion] = useState({});
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClassroom(classroomId);
      if (res.data) {
        const classroom = res.data;
        setClassroom(classroom);
      } else {
        message.error(res.err);
      }
      const dis = await getDiscussion(classroom.discussion.id);
      if (dis.data) {
        const discussion = dis.data;
        setDiscussion(discussion);
        console.log(discussion);
      } else {
        message.error(dis.err);
      }
    };
    fetchData();
  }, [classroomId]);

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
