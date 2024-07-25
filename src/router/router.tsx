import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../lib/RequireAuth";

// import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ActivateUserPage from "../pages/ActivateUserPage";
import ResetPasswordConfirmPage from "../pages/ResetPasswordConfirmPage";
import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";

// import LayoutAuthPage from "../pages/authenticated/LayoutAuthPage";
// import HomePage from "../pages/authenticated/HomePage";

const Layout = lazy(() => import("../pages/Layout"));
const LayoutAuthPage = lazy(
  () => import("../pages/authenticated/LayoutAuthPage")
);
const HomePage = lazy(() => import("../pages/authenticated/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Layout />
      </Suspense>
    ),
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
        path: "/home",
        element: (
          <Suspense fallback={<Spinner />}>
            <LayoutAuthPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
