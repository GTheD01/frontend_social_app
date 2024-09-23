import { Link } from "react-router-dom";

interface PopularPostProps {
  logo: string | undefined;
  postAuthor: string | undefined;
  postContent: string | undefined;
  postDate: string | undefined;
  postId: string | undefined;
}

const PopularPost = ({
  logo,
  postContent,
  postAuthor,
  postDate,
  postId,
}: PopularPostProps) => {
  return (
    <Link to={`/post/${postId}`}>
      <div className="shadow-md rounded-t-md">
        <img
          src={logo}
          alt="popular post pic"
          className="w-56 h-[298px] m-auto"
        />
        <div className="bg-white p-4 flex flex-col gap-4 rounded-b-md">
          <h6 className="text-sky-500">Popular</h6>
          <h3 className="font-semibold">
            <span className="font-light">Post by</span>: {postAuthor}
          </h3>
          <p className="text-gray-400">{postContent}</p>
          <span className="text-gray-300 text-end">{postDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default PopularPost;
