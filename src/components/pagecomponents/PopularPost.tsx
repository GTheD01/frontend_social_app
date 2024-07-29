interface PopularPostProps {
  logo: string;
  postTitle: string;
  postDescription: string;
  postDate: string;
}

const PopularPost = ({
  logo,
  postDescription,
  postTitle,
  postDate,
}: PopularPostProps) => {
  return (
    <div>
      <div className="shadow-md rounded-t-md">
        <img
          src={logo}
          alt="popular post pic"
          className="w-56 h-[298px] m-auto"
        />
        <div className="bg-white p-4 flex flex-col gap-4 rounded-b-md">
          <h6 className="text-sky-500">Popular</h6>
          <h3 className="font-semibold">{postTitle}</h3>
          <p className="text-gray-400">{postDescription}</p>
          <span className="text-gray-300 text-end">{postDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularPost;
