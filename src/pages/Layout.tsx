import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useAppSelector } from "../redux/hooks";

const Layout = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-full flex justify-center items-center w-full">
      <div className="flex items-center gap-4 w-full h-full">
        <div className="bg-sky-500 w-1/2 h-full content-center text-center">
          <h1 className="font-bold lg:text-8xl md:text-6xl text-4xl tracking-wide">
            Socializing
          </h1>
          <p className="tracking-wide md:text-xl text-sm mt-4">
            Let's hang out together.
          </p>
        </div>
        <div className="text-center w-1/2">
          {location.pathname === "/" && <LoginPage />}
          <Outlet />
        </div>
      </div>
      <p className="absolute bottom-0 right-0 mr-2 text-gray-600">
        &copy; {currentYear} Copyright by Socializing
      </p>
    </div>
  );
};

export default Layout;
