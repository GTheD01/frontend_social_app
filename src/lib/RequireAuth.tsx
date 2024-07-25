import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Spinner from "../components/Spinner";

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
