import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  //ниже сам механизм сортировки по значению
  const sortedPosts = useMemo(() => {
    if (sort) {
      //ниже строчка базовой сортировки где сравнивается a с b и на выходе мы получаем новый массив с уже отсортиров значениями
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  //ниже функция которая возвращает отфильтрованный и отсортированный массив
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
