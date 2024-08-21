import { useCallback } from "react";
import { useFollowUserMutation } from "../redux/features/authApiSlice";

const useFollowUser = () => {
  const [followUser] = useFollowUserMutation();

  const followUserHandler = useCallback(
    (username: string | undefined) => {
      followUser(username)
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [followUser]
  );

  return followUserHandler;
};

export default useFollowUser;
