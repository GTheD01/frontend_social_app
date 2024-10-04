import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  useDeletePostMutation,
  useRemoveCommentMutation,
} from "../../redux/features/postsApiSlice";
import {
  useLikePostMutation,
  useSavePostMutation,
} from "../../redux/features/postsApiSlice";
import {
  deletePostComments,
  toggleActionModal,
  updateDeletePost,
  updateLikePost,
  updateSavedPost,
} from "../../redux/features/postSlice";
import { toggleCommentActionModal } from "../../redux/features/commentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import PostModal from "./PostModal";
import { AttachmentProps, CommentProps } from "../../types/types";
import CommentModal from "./CommentModal";
import Carousel from "./Carousel";

import { toast } from "react-toastify";

import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

interface ComponentPostProps {
  image?: string;
  username: string;
  subtitle?: string;
  attachments?: AttachmentProps[];
  created_at: string;
  body: string;
  postId: string;
  likes_count: string;
  user_liked: boolean;
  post_saved: boolean;
  post_owner: boolean;
  comments?: CommentProps[];
  comments_count: string;
}

const Post = ({
  image,
  username,
  subtitle,
  created_at,
  body,
  attachments,
  postId,
  likes_count,
  user_liked,
  post_saved,
  post_owner,
  comments,
  comments_count,
}: ComponentPostProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { actionModal } = useAppSelector((state) => state.post);
  const { commentActionModal } = useAppSelector((state) => state.comment);

  const [deletePost] = useDeletePostMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [likePost] = useLikePostMutation();
  const [savePost] = useSavePostMutation();

  const togglePostModal = useCallback(
    (id: string) => {
      dispatch(toggleActionModal({ id }));
    },
    [dispatch]
  );

  const toggleCommentModal = useCallback(
    (id: string) => {
      dispatch(toggleCommentActionModal({ id }));
    },
    [dispatch]
  );

  const postDeleteHandler = () => {
    dispatch(updateDeletePost(postId));
    deletePost(postId)
      .unwrap()
      .then(() => {
        toast.success("Post deleted");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentHandler = (commentId: string) => {
    // Delete comment
    dispatch(deletePostComments(postId));
    removeComment({ postId: postId, commentId: commentId })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postLikeHandler = () => {
    // update the ui optimisticallY

    dispatch(updateLikePost(postId));

    likePost(postId)
      .unwrap()
      .then((response) => {
        // toast.success(response.message);
      })
      .catch((err) => {
        // if request fail we revert the values to previous state
        dispatch(updateLikePost(postId));
      });
  };

  const savePostHandler = () => {
    // update the ui optimisticallY

    dispatch(updateSavedPost(postId));

    savePost(postId)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((err) => {
        // if request fail we revert the values to previous state
        dispatch(updateSavedPost(postId));
      });
  };

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      const btnModal = document.getElementById(`btn-${actionModal}`);
      if (e.target !== btnModal) {
        togglePostModal("");
      }
    };

    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && actionModal) {
        togglePostModal("");
      }
    };

    document.addEventListener("click", closeModal);
    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.removeEventListener("click", closeModal);
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [actionModal, togglePostModal]);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      const btnModal = document.getElementById(`comment-${commentActionModal}`);

      if (e.target !== btnModal) {
        toggleCommentModal("");
      }
    };

    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && commentActionModal) {
        toggleCommentModal("");
      }
    };

    document.addEventListener("click", closeModal);
    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.removeEventListener("click", closeModal);
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [commentActionModal, toggleCommentModal]);

  return (
    <li
      key={postId}
      className="overflow-x-hidden list-none max-w-[560px] overflow-y-hidden pb-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            alt="user img"
            src={image || "https://picsum.photos/200/200"}
            className="w-10 h-10 rounded-full border border-gray-400 object-contain cursor-pointer"
          />

          <div>
            <Link
              to={`/profile/${username}`}
              className="font-semibold cursor-pointer"
            >
              {username}
            </Link>
            <p className="text-gray-400 text-xs">{subtitle}</p>
          </div>
          <span className="text-gray-400 text-xs">&#183; {created_at} ago</span>
        </div>
        <button
          id={`btn-${postId}`}
          aria-pressed={actionModal === postId}
          aria-label="post-actions-modal-button"
          onClick={() => togglePostModal(postId)}
          className="cursor-pointer relative outline-none not-sr-only"
        >
          <HiDotsVertical className="text-gray-500 text-xl pointer-events-none" />

          <PostModal
            postId={postId}
            postDeleteHandler={postDeleteHandler}
            post_owner={post_owner}
          />
        </button>
      </div>
      <div className="py-4">
        <p>{body}</p>
      </div>
      {attachments && attachments.length > 0 && (
        <Carousel attachments={attachments} />
      )}
      <div className="flex gap-4 mt-4">
        <span
          onClick={postLikeHandler}
          className="flex items-center gap-2 cursor-pointer"
        >
          <GrLike className={`${user_liked ? "stroke-blue-500" : ""}`} />
          <span className="font-semibold">{likes_count}</span>
          Like
        </span>
        <Link
          to={`/post/${postId}`}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaRegComment />
          {`${comments_count} ${
            parseInt(comments_count) > 1 ? "Comments" : "Comment"
          }`}
        </Link>
        <span
          onClick={savePostHandler}
          className="flex items-center gap-2 cursor-pointer"
        >
          <BsCollection className={`${post_saved ? "fill-blue-500" : ""}`} />
          Save
        </span>
      </div>

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
    </li>
  );
};

export default Post;
