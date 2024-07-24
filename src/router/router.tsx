import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../lib/RequireAuth";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ActivateUserPage from "../pages/ActivateUserPage";
import ResetPasswordConfirmPage from "../pages/ResetPasswordConfirmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "password-reset",
        element: <ResetPasswordPage />,
      },
      {
        path: "password-reset/:uid/:token",
        element: <ResetPasswordConfirmPage />,
      },
      {
        path: "activation/:uid/:token",
        element: <ActivateUserPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/dashboard",
        element: <div>Test</div>,
      },
    ],
  },
]);

export default router;
