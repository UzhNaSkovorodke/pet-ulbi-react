import React from "react";
import PostItem from "./PostItem";

function PostList({ posts, title, removePost }) {
  return (
    <div>
      <h1>{title}</h1>
      {posts.map((el, index) => (
        <PostItem
          removePost={removePost}
          post={el}
          key={el.id}
          number={index}
        />
      ))}
    </div>
  );
}

export default PostList;
