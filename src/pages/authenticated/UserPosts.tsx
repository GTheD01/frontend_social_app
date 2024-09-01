import { useParams } from "react-router-dom";

import { useRetrieveProfilePostsQuery } from "../../redux/features/postsApiSlice";
import PostsList from "../../components/pagecomponents/PostsList";

const UserPosts = () => {
  const { username } = useParams();

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching,
  } = useRetrieveProfilePostsQuery(username);

  return (
    <PostsList
      posts={posts}
      isLoading={isLoadingPosts}
      isFetching={isFetching}
    />
  );
};

export default UserPosts;
