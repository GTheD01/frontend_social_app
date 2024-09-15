import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useLazyGetOrCreateMessageQuery,
  useRetrieveUserDetailsQuery,
} from "../../redux/features/authApiSlice";
import Spinner from "../../components/common/Spinner";
import { useAppSelector } from "../../redux/hooks";
import useFollowUser from "../../hooks/useFollowUser";

const ProfilePage = () => {
  const { username } = useParams();
  const { data, isLoading } = useRetrieveUserDetailsQuery(username);
  const loggedUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [triggerGetOrCreateMessage] = useLazyGetOrCreateMessageQuery();

  const isLoggedUser = data?.username === loggedUser?.username;

  const { pathname } = useLocation();

  const followUser = useFollowUser();

  const onClick = async (userId: string) => {
    const { data } = await triggerGetOrCreateMessage(userId);

    if (data && data.id) {
      navigate(`/messages/${data?.id}`);
    }
  };

  return (
    <div className="mx-52 px-5 pt-7">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header className="grid grid-cols-profile">
            <section className="justify-self-center col-start-1 row-start-1 row-end-5 mr-7">
              <img
                src={data?.get_avatar}
                className="w-44 h-44 rounded-full"
                alt="user img"
              />
            </section>
            <section className="col-span-2 col-start-2 row-start-1  ">
              <div className="flex items-center gap-4">
                <span className="font-semibold">{data?.username}</span>
                {isLoggedUser ? (
                  <>
                    <Link to="/settings">Edit Profile</Link>
                    <button>View archive</button>
                  </>
                ) : (
                  <button
                    onClick={() => onClick(data?.id)}
                    className="border border-gray-300 p-2"
                  >
                    Message
                  </button>
                )}
              </div>
            </section>
            <section className="col-start-2 col-end-3 row-start-2 flex gap-4">
              <p>
                <span className="font-semibold">{data?.posts_count}</span> posts
              </p>
              <p>
                <span className="font-semibold">{data?.followers_count}</span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">{data?.following_count}</span>{" "}
                following
              </p>
            </section>
            <section className="col-start-2 col-end-3 row-start-3  ">
              <p className="font-bold">{data?.full_name}</p>
            </section>
            <section className="col-start-2 col-end-3 row-start-4">
              {!isLoggedUser && (
                <button
                  onClick={() => followUser(data?.username)}
                  className="bg-sky-400 px-4 py-2 hover:bg-sky-300"
                >
                  {data?.user_follows ? "Unfollow" : "Follow"}
                </button>
              )}
            </section>

            <section className="row-start-5 col-start-1 col-end-3"></section>
          </header>
          <div className="flex items-center justify-center mt-8 gap-8 border-t-2 border-gray-300">
            <Link
              to="."
              aria-selected={pathname.endsWith(username as string)}
              className={`${
                pathname.endsWith(username as string)
                  ? "aria-selected:border-white aria-selected:mt-[-1.8px] aria-selected:border-t-2"
                  : ""
              } cursor-pointer transition ease-in duration-500`}
            >
              POSTS
            </Link>
            {isLoggedUser && (
              <Link
                to="saved"
                aria-selected={pathname.endsWith("saved")}
                className={`${
                  pathname.endsWith("saved")
                    ? "aria-selected:border-white aria-selected:mt-[-1.8px] aria-selected:border-t-2"
                    : ""
                } cursor-pointer transition ease-in duration-500`}
              >
                SAVED
              </Link>
            )}
            <Link
              to="tagged"
              aria-selected={pathname.endsWith("tagged")}
              className=" aria-selected:border-white aria-selected:mt-[-1.8px] aria-selected:border-t-2 cursor-pointer transition ease-in"
            >
              TAGGED
            </Link>
          </div>
          <div className="flex flex-col gap-12 mt-12">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
