import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../redux/features/authApiSlice";
import { toggleActionModal } from "../../redux/features/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import PostModal from "./PostModal";

import { toast } from "react-toastify";

import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

interface PostProps {
  image?: string;
  username: string;
  subtitle?: string;
  attachments?: string;
  created_at: string;
  body: string;
  postId: string;
}

const Post = ({
  image,
  username,
  subtitle,
  created_at,
  body,
  attachments,
  postId,
}: PostProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { actionModal } = useAppSelector((state) => state.post);

  const [deletePost] = useDeletePostMutation();

  const toggleModal = useCallback(
    (id: string) => {
      dispatch(toggleActionModal({ id }));
    },
    [dispatch]
  );

  const postDeleteHandler = () => {
    deletePost(postId)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      // const btnsModal = document.querySelectorAll(
      //   `button[data-postid='${actionModal}']`
      // );
      // const btnModal = btnsModal[0];

      const btnModal = document.getElementById(`btn-${actionModal}`);
      if (e.target !== btnModal) {
        toggleModal("");
      }
    };

    document.addEventListener("click", closeModal);

    return () => document.removeEventListener("click", closeModal);
  }, [actionModal, toggleModal]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            alt="user img"
            src={image || "https://picsum.photos/200/200"}
            className="w-10 h-10 rounded-full border border-gray-400 object-contain cursor-pointer"
          />

          <div>
            <Link
              to={`/post/${postId}`}
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
          onClick={() => toggleModal(postId)}
          className="cursor-pointer relative"
        >
          <HiDotsVertical className="text-gray-500 text-xl pointer-events-none" />

          <PostModal postId={postId} postDeleteHandler={postDeleteHandler} />
        </button>
      </div>
      <div className="py-4">
        <p>{body}</p>
      </div>
      {attachments && (
        // loop for every image in post attachments
        <img
          src={image}
          className="w-full cursor-pointer"
          alt="user post img"
        />
      )}
      <div className="flex gap-4">
        <span className="flex items-center gap-2 cursor-pointer">
          <GrLike />
          Like
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <FaRegComment />
          Comment
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <BsCollection />
          Save
        </span>
      </div>
    </div>
  );
};

export default Post;
