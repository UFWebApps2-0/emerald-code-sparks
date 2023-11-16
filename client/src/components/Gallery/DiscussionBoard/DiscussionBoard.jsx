import React, { useState, useEffect } from 'react';
import './DiscussionBoard.less';
import { deletePinnedComment, deleteUnpinnedComment, postPinnedComment, postUnpinnedComment, getUnpinnedComments } from '../../../Utils/requests';

const DiscussionBoard = ({ post }) => {
  // State to hold comments
  const [sortedComments, setSortedComments] = useState([]);
  const [commentInput, setCommentInput] = useState(''); // Define commentInput state

  useEffect(() => {
    // Fetch comments when the component mounts
    const fetchComments = async () => {
      try {
        // Extract comments from discussion_board
        const discussionBoard = post.discussion_board || [];

        // Separate comments into two arrays based on the 'pinned' property
        const pinnedComments = discussionBoard.filter(comment => comment.pinned === true);
        const unpinnedComments = discussionBoard.filter(comment => comment.pinned !== true);

        // Combine the sorted comments back into a single array
        const sortedComments = [...pinnedComments, ...unpinnedComments];

        // Update the state with the sorted comments
        setSortedComments(sortedComments);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [post]);

  const handleCommentSubmit = async () => {
    try {
      // Check if the comment input is not empty
      if (commentInput.trim() !== '') {
        // Post an unpinned comment
        await postUnpinnedComment({
          User_name: 'test student', // Replace with the actual username or get it from your authentication system
          comment: commentInput,
          is_pinned: false,
        });

        // Refetch comments to update the discussion board
        const commentsResponse = await getUnpinnedComments();
        const discussionBoard = commentsResponse.data || [];
        const unpinnedComments = discussionBoard.filter(comment => comment.pinned !== true);
        const updatedSortedComments = [...unpinnedComments];
        setSortedComments(updatedSortedComments);

        // Clear the comment input after submission
        setCommentInput('');
      } else {
        // Handle the case where the comment is empty
        console.warn('Comment cannot be empty.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };
  //these props is the actual comment object
  const handlePinning = async (props) => {
    try {
      if(props.pinned === true){
        // Post an unpinned comment
        await postUnpinnedComment({
          User_name: props.User_name, // Replace with the actual username or get it from your authentication system
          comment: props.comment_string,
          is_pinned: false,
        });

        //delete the pinned comment
        await deletePinnedComment(props.id);
      }

      else{
        // Post a pinned comment
        await postPinnedComment({
          User_name: props.User_name,
          comment: props.comment_string,
          is_pinned: true,
        });
        //delete the unpinned comment
        await deleteUnpinnedComment(props.id);
      }

      

        // Refetch comments to update the discussion board
        const commentsResponse = await getUnpinnedComments();
        const discussionBoard = commentsResponse.data || [];
        const unpinnedComments = discussionBoard.filter(comment => comment.pinned !== true);
        const updatedSortedComments = [...unpinnedComments];
        setSortedComments(updatedSortedComments);
    } catch (error) {
      console.error('Error pinning comment:', error.message);
    }
  };

  return (
    <div className='discussion-board'>
      <h3>Discussion</h3>
      <div className='comments'>
        {sortedComments.map((comment, index) => (
          <div key={index} className='comment'>
            <p className='comment-username'>{comment.User_name}</p>
            <textarea
              rows='4'
              cols='50'
              value={comment.comment_string}
              readOnly // Make the textarea read-only to prevent user editing; NEED TO ADD AN EDIT BUTTON FOR THE POSTER.
            />
          </div>
        ))}
      </div>
      <div className='comment-input'>
        <input
          type='text'
          placeholder='Add a comment...'
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
      </div>
    </div>
  );
};

export default DiscussionBoard;
// NEED TO ADD PINNING BUTTON IN THIS FILE TO REDO THE COMMENTS, I HAVE ADDED A FUNCTION TO HANDLE PINNING AND UNPINNING FOR NOW