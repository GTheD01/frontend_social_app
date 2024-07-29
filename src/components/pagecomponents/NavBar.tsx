import { NavLink } from "react-router-dom";
import { logout as setLogout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/features/authApiSlice";

import { IoSearchSharp } from "react-icons/io5";
import logo from "../../assets/result.png";
import { useAppDispatch } from "../../redux/hooks";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const links = [
    {
      href: "/home",
      text: "Home",
    },
    {
      href: "/explore",
      text: "Explore",
    },
    {
      href: "/reels",
      text: "Reels",
    },
    {
      href: "/settings",
      text: "Settings",
    },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };

  return (
    <div className="h-full">
      <div className="bg-white fixed top-0 left-0 flex flex-col gap-4 h-full p-4">
        <div className="flex justify-start items-center text-gray-400 gap-2 p-4">
          <IoSearchSharp className="w-4 h-4" />
          <input
            type="search"
            placeholder="Search"
            className="w-full placeholder-gray-300 outline-none [&::-webkit-search-cancel-button]:hidden p-2"
          />
        </div>
        <div className="p-4">
          <img
            src={logo}
            alt=""
            className="w-12 h-12 rounded-full border object-contain"
          />
          <h1 className="font-semibold mt-4 text-xl">Georgi Popeftimov</h1>
          <p className="font-light text-gray-400 text-sm">Software Engineer</p>
        </div>
        <nav className="">
          <ul className="flex flex-col">
            {links.map((link) => (
              <NavLink
                to={link.href}
                key={link.href}
                className={({ isActive }) =>
                  [
                    " text-xl text-gray-400 hover:bg-gray-300",
                    isActive ? "border-l-4 border-gray-500 p-3" : "p-4",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                {link.text}
              </NavLink>
            ))}
          </ul>
        </nav>
        <button
          type="submit"
          onClick={handleLogout}
          className="text-xl text-gray-400 hover:bg-gray-300 mt-auto p-4 text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;