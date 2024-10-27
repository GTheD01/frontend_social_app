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
        data?.map((post) => <Post post={post} onPostPage={false} />)
      )}
    </div>
  );
};

export default SavedPosts;
