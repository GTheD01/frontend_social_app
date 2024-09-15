import { useAppSelector } from "../../redux/hooks";

interface PostModalProps {
  postId: string;
  postDeleteHandler: () => void;
  post_owner: boolean;
}

const PostModal = ({
  postId,
  postDeleteHandler,
  post_owner,
}: PostModalProps) => {
  const { actionModal } = useAppSelector((state) => state.post);

  return (
    <div
      className={`absolute top-4 right-4 bg-white transition-opacity ease-in z-10 ${
        actionModal === postId
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <ul>
        {post_owner && (
          <li
            onClick={postDeleteHandler}
            className="p-4 cursor-pointer hover:bg-gray-200 text-red-500"
          >
            Delete
          </li>
        )}
        <li className="p-4 cursor-pointer hover:bg-gray-200">Report</li>
      </ul>
    </div>
  );
};

export default PostModal;
