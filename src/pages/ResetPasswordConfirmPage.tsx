import { Link, useParams } from "react-router-dom";
import ResetPasswordConfirmForm from "../components/forms/ResetPasswordConfirmForm";

interface RouteParamsProps extends Record<string, string | undefined> {
  uid?: string;
  token?: string;
}

const ResetPasswordConfirmPage = () => {
  const { uid, token } = useParams<RouteParamsProps>();

  return (
    <div className="w-1/2 m-auto border border-black p-4 rounded-md">
      <h1 className="text-3xl font-bold mb-6">New Password</h1>
      <ResetPasswordConfirmForm uid={uid as string} token={token as string} />
      <Link to="/login" className="hover:text-sky-600">
        {"<-"} Back to Login
      </Link>
    </div>
  );
};

export default ResetPasswordConfirmPage;
