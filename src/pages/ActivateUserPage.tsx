import { useNavigate, useParams } from "react-router-dom";
import { useActivateUserMutation } from "../redux/features/authApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ActivateUserPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [activateUser] = useActivateUserMutation();


  useEffect(() => {
    activateUser({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated. You can log in.");
      })
      .catch(() => {
        console.log("test");
        toast.error("Failed to activate account");
      })
      .finally(() => {
        navigate("/login");
      });
  }, [activateUser, navigate, token, uid]);

  return (
    <h1 className="mt-10 text-center lg:text-2xl md:text-xl font-bold leading-9 tracking-tight text-gray-900">
      Activating your account...
    </h1>
  );
};

export default ActivateUserPage;
