import logo from "../../assets/result.png";
import { IoIosSettings } from "react-icons/io";
import { useRetrieveUserDetailsQuery } from "../../redux/features/authApiSlice";
import Spinner from "../../components/common/Spinner";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const { data, isLoading } = useRetrieveUserDetailsQuery(username);

  const { pathname } = useLocation();

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
                <button>Edit Profile</button>
                <button>View archive</button>
                <span>
                  <IoIosSettings />
                </span>
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
            <section className="col-start-2 col-end-3 row-start-4  "></section>
            <section className="flex gap-12 col-start-1 col-end-3 row-start-6  ">
              <div>
                <img src={logo} className="w-20 h-20" alt="highlight img" />
                <p className="text-center">Highlights</p>
              </div>
              <div>
                <img src={logo} className="w-20 h-20" alt="highlight img" />
                <p className="text-center">Highlights</p>
              </div>
              <div>
                <img src={logo} className="w-20 h-20" alt="highlight img" />
                <p className="text-center">New</p>
              </div>
            </section>
            <section className="row-start-5 col-start-1 col-end-3  "></section>
          </header>
          <div className="flex items-center justify-center mt-8 gap-8 border-t-2 border-gray-300">
            <Link
              to="."
              aria-selected={pathname.endsWith(username!)}
              className={`${
                pathname.endsWith("popeftimov")
                  ? "aria-selected:border-white aria-selected:mt-[-1.8px] aria-selected:border-t-2"
                  : ""
              } cursor-pointer transition ease-in duration-500`}
            >
              POSTS
            </Link>
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
