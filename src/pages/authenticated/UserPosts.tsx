import { useParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import Post from "../../components/pagecomponents/Post";

import { useRetrieveProfilePostsQuery } from "../../redux/features/authApiSlice";

const UserPosts = () => {
  const { username } = useParams();

  const { data: posts, isLoading: isLoadingPosts } =
    useRetrieveProfilePostsQuery(username);

  return (
    <div className="flex flex-col gap-8">
      {isLoadingPosts ? (
        <Spinner lg />
      ) : (
        posts &&
        posts?.map((post) => (
          <Post
            attachments={post.attachments}
            comments_count={post.comments_count}
            post_owner={post.post_owner}
            key={post.id}
            postId={post.id}
            username={post.created_by.username}
            created_at={post.created_at_formatted}
            body={post.body}
            likes_count={post.likes_count}
            post_saved={post.post_saved}
            image={post.created_by.get_avatar}
            user_liked={post.user_liked}
          />
        ))
      )}
    </div>
  );
};

export default UserPosts;
