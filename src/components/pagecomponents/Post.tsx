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
}

const Post = ({
  image,
  username,
  subtitle,
  created_at,
  body,
  attachments,
}: PostProps) => {
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
            <p className="font-semibold cursor-pointer">{username}</p>
            <p className="text-gray-400 text-xs">{subtitle}</p>
          </div>
          <span className="text-gray-400 text-xs">&#183; {created_at} ago</span>
        </div>
        <span className="cursor-pointer">
          <HiDotsVertical className="text-gray-500 text-xl" />
        </span>
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
