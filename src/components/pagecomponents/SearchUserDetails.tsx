import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface SearchUserDetailsProps {
  image: string | undefined;
  username: string;
  full_name: string;
  onClick?: () => void;
  user_follows: boolean;
  size?: "s" | "m" | "l";
}

export default function SearchUserDetails({
  full_name,
  image,
  username,
  onClick,
  user_follows,
  size = "l",
}: SearchUserDetailsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border border-gray-300 p-4 justify-start",
        {
          "w-72": size === "s",
          "w-80": size === "m",
          "w-96": size === "l",
        }
      )}
    >
      <img
        src={image}
        alt="user img"
        className="w-14 h-14 border border-gray-300 rounded-full"
      />
      <div>
        <Link to={`/profile/${username}`} className="font-semibold">
          @{username}
        </Link>
        <p className="text-xs">{full_name}</p>
      </div>
      <button
        onClick={onClick}
        className="bg-sky-400 px-4 py-2 ml-auto hover:bg-sky-300"
      >
        {user_follows ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
