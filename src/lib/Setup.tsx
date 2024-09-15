import { ToastContainer } from "react-toastify";

import useVerify from "../hooks/useVerify";

export default function Setup() {
  useVerify();

  return <ToastContainer />;
}
