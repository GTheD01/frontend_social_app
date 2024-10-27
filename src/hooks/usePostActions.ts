import { toast } from "react-toastify";

import {
  useDeletePostMutation,
  useLikePostMutation,
  useRemoveCommentMutation,
  useSavePostMutation,
} from "../redux/features/postsApiSlice";
import {
  deletePostComments,
  updateDeletePost,
  updateLikePost,
  updateSavedPost,
} from "../redux/features/postSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const usePostActions = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [likePost] = useLikePostMutation();
  const [savePost] = useSavePostMutation();

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
  return {
    postDeleteHandler,
    deleteCommentHandler,
    postLikeHandler,
    savePostHandler,
  };
};

export default usePostActions;
