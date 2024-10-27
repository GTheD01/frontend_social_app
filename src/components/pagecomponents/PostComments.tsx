import { HiDotsVertical } from "react-icons/hi";
import { CommentProps } from "../../types/types";
import CommentModal from "./CommentModal";

const PostComments = ({
  comments,
  deleteCommentHandler,
  toggleCommentModal,
  post_owner,
}: {
  comments: CommentProps[] | undefined;
  deleteCommentHandler: (commentId: string) => void;
  toggleCommentModal: (commentId: string) => void;
  post_owner: boolean;
}) => {
  return (
    <>
      {comments && (
        <>
          <p className="font-bold my-8">Comments</p>
          {comments.length < 1 && <p>No comments</p>}
          <div className="flex flex-col items-end space-y-4  divide-y-2 divide-gray-200">
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between w-[90%] p-1"
              >
                <div className="flex gap-2 items-start">
                  <img
                    alt="comment creator img"
                    src={comment.created_by.get_avatar}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {comment.created_by.username}
                    </p>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {comment.created_at_formatted} ago
                  </span>
                </div>

                <button
                  id={`comment-${comment.id}`}
                  onClick={() => toggleCommentModal(comment.id)}
                  className="cursor-pointer relative outline-none"
                >
                  <HiDotsVertical className="text-gray-500 text-sm pointer-events-none" />
                  <CommentModal
                    post_owner={post_owner}
                    commentId={comment.id}
                    commentDeleteHandler={() =>
                      deleteCommentHandler(comment.id)
                    }
                    comment_owner={comment.comment_owner}
                  />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PostComments;
