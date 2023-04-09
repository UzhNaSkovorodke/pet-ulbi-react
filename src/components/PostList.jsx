import React from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function PostList({ posts, title, removePost }) {
  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((el, index) => (
          <CSSTransition key={el.id} timeout={500} classNames="post">
            <PostItem removePost={removePost} post={el} number={index} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
