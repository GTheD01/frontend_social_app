import { PostProps } from "../../types/types";
import Spinner from "../common/Spinner";
import Post from "./Post";

interface PostsListProps {
  isLoading: boolean;
  posts: PostProps[] | undefined;
  isFetching: boolean;
}

export default function PostsList({
  isLoading,
  posts,
  isFetching,
}: PostsListProps) {
  return (
    <div className="pt-12 px-4 break-words space-y-6 *:last:pb-16">
      {isLoading ? (
        <Spinner />
      ) : (
        posts?.map((post) => {
          return (
            <Post
              comments_count={post.comments_count}
              post_owner={post.post_owner}
              post_saved={post.post_saved}
              user_liked={post.user_liked}
              likes_count={post.likes_count}
              attachments={post.attachments}
              image={post.created_by.get_avatar}
              username={post.created_by.username}
              created_at={post.created_at_formatted}
              body={post.body}
              key={post.id}
              postId={post.id}
            />
          );
        })
      )}
      <div>{isFetching && <Spinner lg />}</div>
    </div>
  );
}
