import { useState, useMemo } from "react";
import "./App.css";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "а", body: "1" },
    { id: 2, title: "красава", body: "3" },
    { id: 3, title: "г ", body: "4" },
    { id: 4, title: "д ", body: "2" },
  ]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  //ниже сам механизм сортировки по значению
  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      //ниже строчка базовой сортировки где сравнивается a с b и на выходе мы получаем новый массив с уже отсортиров значениями
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  //ниже функция создания поста
  const createPost = function (newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //ниже функция удаления поста
  const removePost = function (post) {
    //так реализована фильтрация, просто сравниваем в массиве если у поста id равен с id постом который мы удаляем, то происходит фильтрация этого поста
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  //ниже функция которая возвращает отфильтрованный и отсортированный массив
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedPosts]);

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost} />
      </MyModal>
      <hr style={{ marginTop: "10px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        removePost={removePost}
        //в posts передает отсортированный и отфильтрованный массив
        posts={sortedAndSearchedPosts}
        title={"Список постов"}
      />
    </div>
  );
}

export default App;
