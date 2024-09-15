import { useEffect, useState } from "react";

import { useLazyRetrievePostsQuery } from "../redux/features/postsApiSlice";
import { appendPosts, setPost } from "../redux/features/postSlice";
import { useAppDispatch } from "../redux/hooks";
import useThrottleFunc from "./useThrottleFunc";
import useDebounceFunc from "./useDebounceFunc";

const useInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const throttle = useThrottleFunc();
  const debounce = useDebounceFunc();

  const [triggerRetrievePosts, result] = useLazyRetrievePostsQuery();

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await triggerRetrievePosts(null);
      dispatch(setPost(response.data?.results || []));
      setCursor(response.data?.next ? response.data.next.split("=")[1] : null);
    };

    fetchInitialPosts();
  }, [dispatch, triggerRetrievePosts]);

  // throttle the API call
  const fetchMorePosts = throttle(async () => {
    if (cursor && !isLoading) {
      setIsLoading(true);
      try {
        const response = await triggerRetrievePosts(cursor).unwrap();
        dispatch(appendPosts(response.results || []));
        setCursor(response.next ? response.next.split("=")[1] : null);
      } catch (error) {
        console.error("Failed to fetch more posts", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, 300);

  // Debounce the scroll event
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 150
    ) {
      fetchMorePosts();
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    isLoading: result.isLoading,
    isFetching: result.isFetching,
  };
};

export default useInfiniteScroll;
