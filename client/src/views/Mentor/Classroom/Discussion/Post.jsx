import React from "react";

const Post = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
      <button>Reply</button>
    </div>
  );
};

export default Post;
