import { useSearchParams } from "react-router-dom";

import { useRetrieveSearchedUsersQuery } from "../../redux/features/authApiSlice";
import Spinner from "../../components/common/Spinner";
import SearchUserDetails from "../../components/pagecomponents/SearchUserDetails";
import useFollowUser from "../../hooks/useFollowUser";

const UsersSearchPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { data, isLoading: usersLoading } = useRetrieveSearchedUsersQuery(
    search as string
  );

  const followUser = useFollowUser();

  return (
    <div className="flex flex-col space-y-3 items-start justify-start">
      {usersLoading && <Spinner lg />}
      {data?.map((user) => (
        <SearchUserDetails
          user_follows={user.user_follows}
          onClick={() => followUser(user.username)}
          key={user.id}
          image={user.get_avatar}
          full_name={user.full_name}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default UsersSearchPage;
