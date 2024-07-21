import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

function RegisterPage() {
  return (
    <>
      <div className="w-1/2 m-auto border border-black p-4 rounded-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <RegisterForm />
      </div>
      <div className="border border-gray-500 p-4 m-auto w-1/2 rounded-md mt-4">
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-600 cursor-pointer hover:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
