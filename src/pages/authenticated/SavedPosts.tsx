import { useParams } from "react-router-dom";

import Spinner from "../../components/common/Spinner";
import Post from "../../components/pagecomponents/Post";
import { useRetrieveSavedPostsQuery } from "../../redux/features/postsApiSlice";

const SavedPosts = () => {
  const { username } = useParams();
  const { data, isLoading } = useRetrieveSavedPostsQuery(username);

  return (
    <div className="flex flex-col gap-8">
      {isLoading ? (
        <Spinner lg />
      ) : (
        data?.map((post) => (
          <Post
            comments_count={post.comments_count}
            post_owner={post.post_owner}
            postId={post.id}
            key={post.id}
            body={post.body}
            created_at={post.created_at_formatted}
            username={post.created_by.username}
            image={post.created_by.get_avatar}
            attachments={post.attachments}
            likes_count={post.likes_count}
            user_liked={post.user_liked}
            post_saved={post.post_saved}
          />
        ))
      )}
    </div>
  );
};

export default SavedPosts;
