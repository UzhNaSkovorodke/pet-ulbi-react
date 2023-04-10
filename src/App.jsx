import { useEffect, useState } from "react";
import "./App.css";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import useFetching from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/page";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });
  // в массиве зависимостей pagr т.к состояние в react ассинхронное и это такое решение того что использутеся состояние с отставанием
  useEffect(() => {
    fetchPosts();
  }, [page]);

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
  const changePage = function (page) {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
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
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default App;
