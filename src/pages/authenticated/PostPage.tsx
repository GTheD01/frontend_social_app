import { useParams } from "react-router-dom";

import { useRetrievePostDetailsQuery } from "../../redux/features/authApiSlice";
import Post from "../../components/pagecomponents/Post";
import Spinner from "../../components/common/Spinner";

const PostPage = () => {
  const { postId } = useParams();

  const { data, isLoading } = useRetrievePostDetailsQuery(postId);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[596px]">
        {isLoading ? (
          <Spinner lg />
        ) : (
          <Post
            image={data?.created_by.get_avatar}
            username={data?.created_by.username}
            body={data?.body}
            created_at={data?.created_at_formatted}
            postId={data.id}
          />
        )}
      </div>
    </div>
  );
};

export default PostPage;