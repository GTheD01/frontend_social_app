import { useAppSelector } from "../../redux/hooks";

interface CommentModalProps {
  commentId: string;
  commentDeleteHandler: () => void;
  comment_owner: boolean;
  post_owner: boolean;
}

const CommentModal = ({
  commentId,
  commentDeleteHandler,
  comment_owner,
  post_owner,
}: CommentModalProps) => {
  const { commentActionModal } = useAppSelector((state) => state.comment);

  return (
    <div
      className={`absolute top-4 right-4 bg-white transition-opacity ease-in ${
        commentActionModal === commentId
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <ul>
        {(comment_owner || post_owner) && (
          <li
            onClick={commentDeleteHandler}
            className="p-4 cursor-pointer hover:bg-gray-200 text-red-500"
          >
            Delete
          </li>
        )}
      </ul>
    </div>
  );
};

export default CommentModal;
