import { Link } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="w-1/2 m-auto border border-black p-4 rounded-md">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <ResetPasswordForm />
      <div className="flex justify-between text-sky-500">
        <Link to="/login" className="hover:text-sky-600">
          Back to Login
        </Link>
        <Link to="/register" className="hover:text-sky-600">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
