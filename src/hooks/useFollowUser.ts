import { useFollowUserMutation } from "../redux/features/authApiSlice";

const useFollowUser = () => {
  const [followUser] = useFollowUserMutation();

  const followUserHandler = (username: string | undefined) => {
    followUser(username)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return followUserHandler;
};

export default useFollowUser;
