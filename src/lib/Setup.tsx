import { ToastContainer } from "react-toastify";
import useVerify from "../hooks/useVerify";
import useSetUser from "../hooks/useSetUser";

export default function Setup() {
  useVerify();
  useSetUser();

  return <ToastContainer />;
}
