import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const { formData, onChange, onSubmit, errors } = useLogin();

  return (
    <>
      <div className="w-1/2 m-auto border border-black p-4 rounded-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <LoginForm
          onChange={onChange}
          onSubmit={onSubmit}
          formData={formData}
          errors={errors}
        />
        <Link
          to="/password-reset"
          className=" text-blue-900 cursor-pointer hover:text-blue-700"
        >
          Forgotten your password?
        </Link>
      </div>
      <div className="border border-gray-500 p-4 m-auto w-1/2 rounded-md mt-4">
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 cursor-pointer hover:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
