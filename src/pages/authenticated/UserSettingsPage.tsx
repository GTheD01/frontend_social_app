import EditUserSettingsForm from "../../components/forms/EditUserSettingsForm";
import Spinner from "../../components/common/Spinner";
import { useAppSelector } from "../../redux/hooks";

const UserSettingsPage = () => {
  const user = useAppSelector((state) => state.user);
  const { isLoading } = user;

  return (
    <>
      {isLoading ? (
        <Spinner lg />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <img
              src={user?.get_avatar}
              alt="user avatar"
              className="w-32 h-32 rounded-full border border-gray-400 object-contain"
            />
            <div>
              <p>{user?.full_name}</p>
              <p className="font-extrabold">@{user?.username}</p>
            </div>
          </div>
          <EditUserSettingsForm />
        </>
      )}
    </>
  );
};

export default UserSettingsPage;
