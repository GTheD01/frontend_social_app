import { Link } from "react-router-dom";

import { FaArrowRightLong } from "react-icons/fa6";

interface SuggestedPeopleProps {
  fullName: string;
  username: string;
  avatar: string;
}

const SuggestedPeople = ({
  fullName,
  username,
  avatar,
}: SuggestedPeopleProps) => {
  return (
    <Link to={`/profile/${username}`} className="flex items-center mt-6 gap-2">
      <img
        src={avatar}
        alt="user pic"
        className="w-12 h-12 object-contain rounded-full hover:cursor-pointer"
      />
      <div>
        <p className="text-sky-500 text-md hover:cursor-pointer">{fullName}</p>
        <span className="text-gray-400 text-sm">{username}</span>
      </div>
      <span className="ml-auto hover:cursor-pointer flex items-center justify-center">
        <FaArrowRightLong />
      </span>
    </Link>
  );
};

export default SuggestedPeople;
