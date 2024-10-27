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
    <ul className="pt-12 px-4 break-words space-y-6 *:last:pb-16">
      {!isLoading &&
        posts?.map((post) => {
          return <Post post={post} onPostPage={false} key={post.id} />;
        })}
      <div>{isFetching && <Spinner lg />}</div>
    </ul>
  );
}
