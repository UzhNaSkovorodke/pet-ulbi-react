import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

function PostForm({ createPost }) {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = function (e) {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    createPost(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    //контролируемые инпуты, для этого создано отдельное состояние
    //стоит обратить внимание на то как мы меняем состояние в onChange
    <form action="">
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
    //ну и мы передаем addNewPost как callback чтобы при вызове функции мы могли поместить пост из дочернего компонента в стейт родительский
  );
}

export default PostForm;
