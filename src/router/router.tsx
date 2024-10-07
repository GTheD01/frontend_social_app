import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import RequireAuth from "../lib/RequireAuth";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ActivateUserPage from "../pages/ActivateUserPage";
import ResetPasswordConfirmPage from "../pages/ResetPasswordConfirmPage";
import Spinner from "../components/common/Spinner";
import ProfilePage from "../pages/authenticated/ProfilePage";
import UserSettingsPage from "../pages/authenticated/UserSettingsPage";
import SavedPosts from "../pages/authenticated/SavedPosts";
import UserPosts from "../pages/authenticated/UserPosts";
import Messages from "../pages/authenticated/Messages";
import Conversation from "../pages/authenticated/Conversation";
import Notifications from "../pages/authenticated/Notifications";
import VerifyOtp from "../pages/VerifyOtp";
import { NotificationsWebSocketProvider } from "../providers/NotificationsWebSocketContext";

// import UsersSearchPage from "../pages/authenticated/UsersSearchPage";
// import PostPage from "../pages/authenticated/PostPage";
// import Layout from "../pages/Layout";
// import LayoutAuthPage from "../pages/authenticated/LayoutAuthPage";
// import HomePage from "../pages/authenticated/HomePage";

const Layout = lazy(() => import("../pages/Layout"));
const LayoutAuthPage = lazy(
  () => import("../pages/authenticated/LayoutAuthPage")
);
const HomePage = lazy(() => import("../pages/authenticated/HomePage"));
const PostPage = lazy(() => import("../pages/authenticated/PostPage"));
const UsersSearchPage = lazy(
  () => import("../pages/authenticated/UsersSearchPage")
);

const router = createBrowserRouter([
  {
    path: "",
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
        path: "verify-otp",
        element: <VerifyOtp />,
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
    element: (
      <NotificationsWebSocketProvider>
        <RequireAuth />
      </NotificationsWebSocketProvider>
    ),
    children: [
      {
        element: (
          <Suspense
            fallback={
              <div className="h-screen flex justify-center items-center">
                <Spinner lg />
              </div>
            }
          >
            <LayoutAuthPage />
          </Suspense>
        ),
        children: [
          {
            path: "/home",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "/explore",
            element: <div>Explore</div>,
          },
          {
            path: "/messages",
            element: <Messages />,
            children: [
              {
                path: ":conversationId",
                element: <Conversation />,
              },
            ],
          },
          {
            path: "/notifications",
            element: <Notifications />,
          },
          {
            path: "/settings",
            element: <UserSettingsPage />,
          },
          {
            path: "/profile/:username",
            element: <ProfilePage />,
            children: [
              {
                index: true,
                element: <UserPosts />,
              },
              {
                path: "saved",
                element: <SavedPosts />,
              },
              {
                path: "tagged",
                element: <div>Tagged</div>,
              },
            ],
          },
          {
            path: "/post/:postId",
            element: <PostPage />,
          },
          {
            path: "/users",
            element: <UsersSearchPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
