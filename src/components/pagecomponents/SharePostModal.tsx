import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSharePostModal } from "../../redux/features/postSlice";

import { IoIosClose } from "react-icons/io";
import SharedPostForm from "../forms/SharePostForm";

const SharePostModal = () => {
  const dispatch = useAppDispatch();
  const postToShare = useAppSelector((store) => store.post.postToShare);

  return (
    <div
      onClick={() => dispatch(setSharePostModal({ state: false }))}
      className="fixed bg-black/40 h-screen w-full inset-0 flex items-center justify-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-2/4 relative z-10"
      >
        <SharedPostForm shared={postToShare} />
        <button
          className="absolute text-white -top-7 -right-7 text-4xl cursor-pointer hover:scale-110"
          onClick={() => dispatch(setSharePostModal({ state: false }))}
        >
          <IoIosClose />
        </button>
      </div>
    </div>
  );
};

export default SharePostModal;
