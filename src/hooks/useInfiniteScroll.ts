import { useEffect, useState } from "react";
import {
  postsApiSlice,
  useLazyRetrievePostsQuery,
} from "../redux/features/postsApiSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { appendPosts, setPost } from "../redux/features/postSlice";

const useInfiniteScroll = () => {
  const [cursor, setCursor] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.post);

  const [triggerRetrievePosts, result] = useLazyRetrievePostsQuery();

  useEffect(() => {
    triggerRetrievePosts(null, true).then((response) => {
      dispatch(setPost(response.data?.results || []));
      setCursor(response.data?.next ? response.data.next.split("=")[1] : null);
    });

    return () => {
      setCursor(null);
      dispatch(setPost([]));
    };
  }, [dispatch, triggerRetrievePosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (cursor) {
          triggerRetrievePosts(cursor, true).then((response) => {
            dispatch(appendPosts(response.data?.results || []));
            setCursor(
              response.data?.next?.slice(
                response.data?.next.indexOf("=") + 1
              ) || null
            );

            dispatch(
              postsApiSlice.util.updateQueryData(
                "retrievePosts",
                null,
                (draft) => {
                  // only append new results that are not already in the list
                  const existingIds = draft.results.map((post) => post.id);
                  const newPosts = response.data?.results?.filter(
                    (post) => !existingIds.includes(post.id)
                  );

                  if (newPosts && newPosts.length) {
                    draft.results.push(...newPosts);
                  }

                  // update cursor
                  draft.next = response.data?.next || null;
                }
              )
            );
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerRetrievePosts, cursor, dispatch]);

  return {
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    posts,
  };
};

export default useInfiniteScroll;
