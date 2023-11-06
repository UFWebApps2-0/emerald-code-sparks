import React, { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';

import {
  getClassroom,
  getDiscussion,
  createPost,
  addDiscussionPost,
  createDiscussion,
} from '../../../../Utils/requests';
import { message, Tag } from 'antd';

const Discussion = ({ classroomId }) => {
  const [classroom, setClassroom] = useState({});
  const [discussion, setDiscussion] = useState({});
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    const addData = async () => {
      const res = await createPost(newPost, 'John Doe');
      if (res.data) {
        setPosts([...posts, res.data]);
        addDiscussionPost(discussion.id, posts, res.data);
      } else {
        message.error(res.err);
      }
    };
    addData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClassroom(classroomId);
      if (res.data) {
        const classroom = res.data;
        setClassroom(classroom);
        if (!classroom.discussion) {
          createDiscussion(classroomId);
        }
        const dis = await getDiscussion(classroom.discussion.id);
        if (dis.data) {
          const discussionData = dis.data;
          setDiscussion(discussionData);
          setPosts(discussionData.discussion_posts);
        } else {
          message.error(dis.err);
        }
      } else {
        message.error(res.err);
      }
    };
    fetchData();
  }, []);

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
          <Post key={post.id} postId={post.id} />
        ))}
      </div>
    </>
  );
};

export default Discussion;
