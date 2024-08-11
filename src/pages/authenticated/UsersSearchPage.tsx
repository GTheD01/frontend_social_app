import { useEffect, useState } from "react";
import { useRetrieveUsersQuery } from "../../redux/features/authApiSlice";
import { UserProps } from "../../types/types";

const UsersSearchPage = () => {
  const { data } = useRetrieveUsersQuery();
  const [users, setUsers] = useState<UserProps[]>();
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, []);
  console.log(data);
  return (
    <div className="flex flex-col space-y-3 items-start justify-start">
      {data?.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-4 border border-gray-300 p-4"
        >
          <img
            src={user.get_avatar}
            alt="user img"
            className="w-14 h-14 border border-gray-300 rounded-full"
          />
          <div>
            <p className="font-semibold">@{user.username}</p>
            <p className="text-xs">{user.full_name}</p>
          </div>
          <button className="bg-sky-400 px-4 py-2">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default UsersSearchPage;
