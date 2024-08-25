import { useEffect, useState } from "react";
import { useRetrievePostsQuery } from "../redux/features/authApiSlice";
import { PostProps } from "../types/types";

const useInfiniteScroll = () => {
  const [cursor, setCursor] = useState<string | null>("");

  const { data, isLoading, isFetching } = useRetrievePostsQuery(cursor, {
    skip: cursor === null,
  });

  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    return () => {
      setPosts([]);
      setCursor("");
    };
  }, []);

  useEffect(() => {
    if (data?.results) {
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (!isFetching && data) {
          setCursor(
            (data?.next?.slice(data?.next.indexOf("=") + 1) as string) || null
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursor, isFetching, data]);

  return {
    isFetching,
    isLoading,
    posts,
  };
};

export default useInfiniteScroll;
