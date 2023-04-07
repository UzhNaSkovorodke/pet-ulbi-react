import React from "react";
import MyButton from "./UI/button/MyButton";
function PostItem(props) {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div className="">{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => props.removePost(props.post)}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
}

export default PostItem;
