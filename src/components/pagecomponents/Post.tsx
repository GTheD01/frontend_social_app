import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  setPostToShare,
  setSharePostModal,
  toggleActionModal,
} from "../../redux/features/postSlice";
import { toggleCommentActionModal } from "../../redux/features/commentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import usePostActions from "../../hooks/usePostActions";
import { PostProps } from "../../types/types";
import PostModal from "./PostModal";
import Carousel from "./Carousel";

import { GrLike } from "react-icons/gr";
import { FaRegComment, FaShare } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import PostComments from "./PostComments";

const Post = ({
  post,
  onPostPage,
}: {
  post: PostProps;
  onPostPage: boolean;
}) => {
  const {
    created_by,
    created_at_formatted,
    subtitle,
    body,
    attachments,
    id: postId,
    likes_count,
    user_liked,
    post_saved,
    post_owner,
    comments,
    comments_count,
    shared,
  } = post;
  const dispatch = useAppDispatch();
  const {
    deleteCommentHandler,
    postDeleteHandler,
    postLikeHandler,
    savePostHandler,
  } = usePostActions({ postId });

  const { actionModal } = useAppSelector((state) => state.post);
  const { commentActionModal } = useAppSelector((state) => state.comment);

  const { get_avatar: image, username } = created_by;

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

  useEffect(() => {
    if (!actionModal) return;
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
    if (!commentActionModal) return;
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

  const sharePostHandler = () => {
    dispatch(setPostToShare({ post: post }));
    dispatch(setSharePostModal({ state: true }));
  };

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
          <span className="text-gray-400 text-xs">
            &#183; {created_at_formatted} ago
          </span>
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

      {shared && (
        <div className="ml-4 border-l-2 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <img
                alt="user img"
                src={
                  shared.created_by.get_avatar ||
                  "https://picsum.photos/200/200"
                }
                className="w-10 h-10 rounded-full border border-gray-400 object-contain cursor-pointer"
              />

              <div>
                <Link
                  to={`/profile/${shared.created_by.username}`}
                  className="font-semibold cursor-pointer"
                >
                  {shared.created_by.username}
                </Link>
                <p className="text-gray-400 text-xs">{shared.subtitle}</p>
              </div>
              <span className="text-gray-400 text-xs">
                &#183; {shared.created_at_formatted} ago
              </span>
            </div>
          </div>
          <div className="py-4">
            <p>{shared.body}</p>
          </div>
          {shared.attachments && shared.attachments.length > 0 && (
            <Carousel attachments={shared.attachments} />
          )}
        </div>
      )}

      <div className="flex mt-4 justify-between">
        <div className="flex items-center gap-4">
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
        <span
          onClick={sharePostHandler}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaShare className="text-gray-500" />
          Share
        </span>
      </div>
      {onPostPage && (
        <PostComments
          comments={comments}
          deleteCommentHandler={deleteCommentHandler}
          post_owner={post_owner}
          toggleCommentModal={toggleCommentModal}
        />
      )}
    </li>
  );
};

export default Post;
