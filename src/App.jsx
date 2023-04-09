import { useEffect, useState } from "react";
import "./App.css";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsPostLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostLoading(false);
  }
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

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />

      {isPostLoading ? (
        <h1>Идет загрузка....</h1>
      ) : (
        <PostList
          removePost={removePost}
          //в posts передает отсортированный и отфильтрованный массив
          posts={sortedAndSearchedPosts}
          title={"Список постов"}
        />
      )}
    </div>
  );
}

export default App;
